package com.easyerp.billservice.services.impl;

import com.easyerp.billservice.config.EasyERPConfiguration;
import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.domains.BillLine;
import com.easyerp.billservice.domains.BillLineCompositeKey;
import com.easyerp.billservice.domains.BillPdf;
import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.exceptions.ConflictException;
import com.easyerp.billservice.exceptions.ForbiddenException;
import com.easyerp.billservice.repositories.BillLineRepository;
import com.easyerp.billservice.repositories.BillPdfRepository;
import com.easyerp.billservice.repositories.BillRepository;
import com.easyerp.billservice.requests.BillRequest;
import com.easyerp.billservice.services.BillService;
import com.easyerp.billservice.utils.PdfGeneratorUtils;
import com.easyerp.billservice.utils.SecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.hibernate.Session;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileOutputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;
    private final BillLineRepository billLineRepository;
    private final OAuth2RestOperations restTemplate;
    private final PdfGeneratorUtils pdfGeneratorUtils;
    private final EasyERPConfiguration easyERPConfiguration;
    private final ObjectMapper objectMapper;
    private final BillPdfRepository billPDFRepository;

    @Override
    public Bill create(final BillRequest billRequest, final OAuth2Authentication authentication) {

        Bill bill = new Bill(billRequest);
        bill.setCreatedBy(authentication.getName());
        bill = this.billRepository.saveAndFlush(bill);

        return feedBillAndSave(bill, billRequest, authentication);
    }

    @Override
    public Bill update(final Bill bill, final BillRequest billRequest, final OAuth2Authentication authentication) {
        return feedBillAndSave(bill, billRequest, authentication);
    }

    private Bill feedBillAndSave(final Bill bill, final BillRequest billRequest,
            final OAuth2Authentication authentication) {
        final var lines = billRequest.getLines().parallelStream().map(billLineRequest -> {
            final var key = new BillLineCompositeKey();
            key.setBill(bill);
            key.setLineNumber(billLineRequest.getLineNumber());

            final BillLine billLine = this.billLineRepository.findById(key).orElse(new BillLine());

            billLine.setLineNumber(billLineRequest.getLineNumber());
            billLine.setDescription(billLineRequest.getDescription());
            billLine.setPreTaxPrice(billLineRequest.getPreTaxPrice());
            billLine.setQuantity(billLineRequest.getQuantity());
            billLine.setBill(bill);

            return billLine;
        }).collect(Collectors.toList());

        bill.getLines().clear();
        bill.getLines().addAll(this.billLineRepository.saveAll(lines));

        bill.setClientId(billRequest.getClientId());
        bill.setTva(billRequest.getTva());
        bill.setTotal(billRequest.getLines().stream()
                .mapToDouble(line -> line.getPreTaxPrice() * line.getQuantity() * (1 + billRequest.getTva())).sum());

        if (billRequest.isDraft()) {
            bill.setStatus(BillStatus.DRAFT);
        } else {
            if (SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
                bill.setStatus(BillStatus.WAITING_CUSTOMER);
            } else {
                bill.setStatus(BillStatus.NEED_CONFIRMATION);
            }
        }

        return this.billRepository.saveAndFlush(bill);
    }

    @Override
    public Bill publish(final Bill bill, final OAuth2Authentication authentication) {
        if (SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
            bill.setStatus(BillStatus.WAITING_CUSTOMER);
        } else {
            bill.setStatus(BillStatus.NEED_CONFIRMATION);
        }
        return this.billRepository.save(bill);
    }

    @Override
    public Bill accept(final Bill bill, final OAuth2Authentication authentication) {
        if (bill.getStatus() != BillStatus.WAITING_CUSTOMER) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.ACCEPTED);
        return this.billRepository.save(bill);
    }

    @Override
    public Bill cancel(final Bill bill, final OAuth2Authentication authentication) {
        if (bill.getStatus() != BillStatus.WAITING_CUSTOMER) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.CANCELED);
        return this.billRepository.save(bill);
    }

    @Override
    public Bill send(final Bill bill, final OAuth2Authentication authentication) {
        if (bill.getStatus() != BillStatus.NEED_CONFIRMATION) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.WAITING_CUSTOMER);
        return this.billRepository.save(bill);
    }

    @Override
    public Bill createFromQuote(final BillRequest billRequest, final OAuth2Authentication authentication) {
        Bill bill = new Bill(billRequest);
        bill.setCreatedBy(authentication.getName());
        bill = this.billRepository.saveAndFlush(bill);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        final HttpEntity entity = new HttpEntity<Long>(bill.getId(), headers);
        restTemplate.exchange("http://api.easy-erp.lan/quote-service/api/quotes/" + bill.getQuoteId() + "/link-to-bill/"
                + bill.getId(), HttpMethod.PATCH, entity, Void.class);
        return feedBillAndSave(bill, billRequest, authentication);
    }

    @Override
    public Bill payed(final Bill bill, final OAuth2Authentication authentication) {
        if (bill.getStatus() != BillStatus.ACCEPTED) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.PAYED);
        return this.billRepository.save(bill);
    }

    @Override
    public File generatePDF(Long id, OAuth2Authentication authentication) throws Exception {
        Bill bill = this.billRepository.findById(id).orElseThrow();

        // Reference du devis
        String billReference = "DEV" + bill.getId() + "-" + String.format("%05d", bill.getVersion());

        Map data = new HashMap<String, Object>();

        data.put("access_token", ((OAuth2AuthenticationDetails)authentication.getDetails()).getTokenValue());
        data.put("billReference", billReference);

        // Recupération des informations utilisateurs
        data.put("user",this.objectMapper.convertValue(authentication.getUserAuthentication().getDetails(), Map.class));

        // Récupération des informations clients
        var customerData = restTemplate.getForEntity("http://api.easy-erp.lan/client-service/api/clients/" + bill.getClientId(), Map.class).getBody();
        data.put("customer", this.objectMapper.convertValue(customerData, Map.class));

        // Récupération des informations sur la facture
        data.put("bill", this.objectMapper.convertValue(bill, Map.class));

        // Génération du PDF
        var byteArrayOutputStream = this.pdfGeneratorUtils.createPdf("facture", data);

        if (byteArrayOutputStream == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "PDF is empty");
        }

        //Enregistrement du fichier
        File file = new File(easyERPConfiguration.getFileDirectory() + bill.getClientId() + "/" + billReference + ".pdf");
        file.getParentFile().mkdirs();
        file.createNewFile();
        var fos = new FileOutputStream(file);
        byteArrayOutputStream.writeTo(fos);

        //Enregistrement en base de données
        BillPdf billPdf = new BillPdf();
        billPdf.setCreatedBy(authentication.getName());
        billPdf.setFileName(file.getName());
        billPdf.setBill(bill);
        billPdf.setBillVersion(bill.getVersion());
        this.billPDFRepository.save(billPdf);

        return file;
    }

    @SneakyThrows
    @Override
    public File getPDFOrGenerateIt(Long id, OAuth2Authentication authentication) {
        Optional<BillPdf> billPdf = this.billPDFRepository.findFirstByBill_IdOrderByIdDesc(id);
        if (billPdf.isEmpty() || (!billPdf.get().getBillVersion().equals(billPdf.get().getBill().getVersion()) && !billPdf.get().getBill().isLocked())) {
            return this.generatePDF(id, authentication);
        } else {
            File file = new File(easyERPConfiguration.getFileDirectory() + billPdf.get().getBill().getClientId() + "/" + billPdf.get().getFileName());
            return file.exists() ? file : this.generatePDF(id, authentication);
        }
    }

    @Override
    public List<Bill> findForMe(OAuth2Authentication authentication) {
        Map userInfo = this.objectMapper.convertValue(authentication.getUserAuthentication().getDetails(), Map.class);
        if (userInfo.get("clientId") == null) {
            return new ArrayList<>();
        }
        return this.billRepository.findByClientId((Long) userInfo.get("clientId"));
    }
}
