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

    public BillServiceImpl(BillRepository billRepository, BillLineRepository billLineRepository, OAuth2RestOperations restTemplate) {
        this.billRepository = billRepository;
        this.billLineRepository = billLineRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public Bill create(BillRequest billRequest, OAuth2Authentication authentication) {

        Bill bill = new Bill(billRequest);
        bill.setCreatedBy(0L);
        bill = this.billRepository.saveAndFlush(bill);

        return feedBillAndSave(bill, billRequest, authentication);
    }

    @Override
    public Bill update(Bill bill, BillRequest billRequest, OAuth2Authentication authentication) {
//        if (!authentication.getName().equals(bill.getCreatedBy().toString())) {
//            throw new ForbiddenException();
//        }

        return feedBillAndSave(bill, billRequest, authentication);
    }

    private Bill feedBillAndSave(Bill bill, BillRequest billRequest, OAuth2Authentication authentication) {
        var lines = billRequest.getLines().parallelStream().map(billLineRequest -> {
            var key =new BillLineCompositeKey();
            key.setBill(bill);
            key.setLineNumber(billLineRequest.getLineNumber());

            BillLine billLine = this.billLineRepository.findById(key).orElse(new BillLine());

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
        bill.setTotal(billRequest.getLines().stream().mapToDouble(line -> line.getPreTaxPrice() * line.getQuantity() * (1 + billRequest.getTva())).sum());

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
    public void publish(Bill bill, OAuth2Authentication authentication) {
//        if (!authentication.getName().equals(bill.getCreatedBy())) {
//            throw new ForbiddenException();
//        }

        if (SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
            bill.setStatus(BillStatus.WAITING_CUSTOMER);
        } else {
            bill.setStatus(BillStatus.NEED_CONFIRMATION);
        }

        this.billRepository.save(bill);

    }

    @Override
    public void accept(Bill bill, OAuth2Authentication authentication) {
//        if (!bill.getClientId().equals(authentication.getName())) {
//            throw new ForbiddenException();
//        }
        if (bill.getStatus() != BillStatus.WAITING_CUSTOMER) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.ACCEPTED);
        this.billRepository.save(bill);
    }

    @Override
    public void cancel(Bill bill, OAuth2Authentication authentication) {
//        if (!bill.getClientId().equals(authentication.getName())) {
//            throw new ForbiddenException();
//        }
        if (bill.getStatus() != BillStatus.WAITING_CUSTOMER) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.CANCELED);
        this.billRepository.save(bill);
    }

    @Override
    public void send(Bill bill, OAuth2Authentication authentication) {
        if (!SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
            throw new ForbiddenException();
        }
        if (bill.getStatus() != BillStatus.NEED_CONFIRMATION) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.WAITING_CUSTOMER);
        this.billRepository.save(bill);
    }

    @Override
    public Bill createFromQuote(BillRequest billRequest, OAuth2Authentication authentication) {
        Bill bill = new Bill(billRequest);
        bill.setCreatedBy(0L);
        bill = this.billRepository.saveAndFlush(bill);
        restTemplate.patchForObject("http://quote-service:8080/api/quotes/" + bill.getQuoteId() + "/link-to-bill/" + bill.getId(), null, Map.class);
        return feedBillAndSave(bill, billRequest, authentication);
    }
}
