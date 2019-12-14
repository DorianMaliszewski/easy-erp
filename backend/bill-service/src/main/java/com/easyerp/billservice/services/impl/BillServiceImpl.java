package com.easyerp.billservice.services.impl;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.domains.BillLine;
import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.exceptions.ConflictException;
import com.easyerp.billservice.exceptions.ForbiddenException;
import com.easyerp.billservice.repositories.BillRepository;
import com.easyerp.billservice.requests.BillRequest;
import com.easyerp.billservice.services.BillService;
import com.easyerp.billservice.utils.SecurityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;

    public BillServiceImpl(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    @Override
    public Bill create(BillRequest billRequest, OAuth2Authentication authentication) {

        Bill bill = new Bill(billRequest);

        billRequest.getLines().forEach(line -> {
            BillLine newLine = new BillLine(line);
            newLine.setBill(bill);
            bill.getLines().add(newLine);
        });
        bill.setPrice(
                billRequest.getLines().stream().mapToDouble(line -> line.getUnitaryPrice() * line.getQuantity()).sum());

        bill.setCreatedBy(0L);

        if (SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
            bill.setStatus(BillStatus.WAITING_CUSTOMER);
        } else {
            bill.setStatus(BillStatus.NEED_CONFIRMATION);
        }

        if (billRequest.getIsDraft())
            bill.setStatus(BillStatus.DRAFT);

        return this.billRepository.save(bill);
    }

    @Override
    public Bill update(Bill bill, BillRequest billRequest, OAuth2Authentication authentication) {
        if (!authentication.getName().equals(bill.getCreatedBy().toString())) {
            throw new ForbiddenException();
        }

        bill.setLines(new ArrayList<>());
        billRequest.getLines().forEach(line -> {
            bill.getLines().add(new BillLine(line));
        });
        bill.setPrice(
                billRequest.getLines().stream().mapToDouble(line -> line.getUnitaryPrice() * line.getQuantity()).sum());

        return this.billRepository.save(bill);
    }

    @Override
    public void publish(Bill bill, OAuth2Authentication authentication) {
        if (!authentication.getName().equals(bill.getCreatedBy())) {
            throw new ForbiddenException();
        }

        if (SecurityUtils.isMoreThanOrEqualManager(authentication.getAuthorities())) {
            bill.setStatus(BillStatus.WAITING_CUSTOMER);
        } else {
            bill.setStatus(BillStatus.NEED_CONFIRMATION);
        }

        this.billRepository.save(bill);

    }

    @Override
    public void accept(Bill bill, OAuth2Authentication authentication) {
        if (!bill.getClientId().equals(authentication.getName())) {
            throw new ForbiddenException();
        }
        if (bill.getStatus() != BillStatus.WAITING_CUSTOMER) {
            throw new ConflictException();
        }
        bill.setStatus(BillStatus.ACCEPTED);
        this.billRepository.save(bill);
    }

    @Override
    public void cancel(Bill bill, OAuth2Authentication authentication) {
        if (!bill.getClientId().equals(authentication.getName())) {
            throw new ForbiddenException();
        }
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
}
