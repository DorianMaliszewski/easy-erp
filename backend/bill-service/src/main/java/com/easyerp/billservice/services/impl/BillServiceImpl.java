package com.easyerp.billservice.services.impl;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.domains.BillLine;
import com.easyerp.billservice.domains.BillLineCompositeKey;
import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.exceptions.ConflictException;
import com.easyerp.billservice.exceptions.ForbiddenException;
import com.easyerp.billservice.repositories.BillLineRepository;
import com.easyerp.billservice.repositories.BillRepository;
import com.easyerp.billservice.requests.BillRequest;
import com.easyerp.billservice.services.BillService;
import com.easyerp.billservice.utils.SecurityUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;
    private final BillLineRepository billLineRepository;
    private final OAuth2RestOperations restTemplate;

    public BillServiceImpl(final BillRepository billRepository, final BillLineRepository billLineRepository,
            final OAuth2RestOperations restTemplate) {
        this.billRepository = billRepository;
        this.billLineRepository = billLineRepository;
        this.restTemplate = restTemplate;
    }

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
}
