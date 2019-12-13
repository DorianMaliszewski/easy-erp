package com.easyerp.billservice.services;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.requests.BillRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public interface BillService {
    Bill create(BillRequest quoteRequest, OAuth2Authentication authentication);

    Bill update(Bill bill, BillRequest billRequest, OAuth2Authentication authentication);

    void publish(Bill bill, OAuth2Authentication authentication);

    void accept(Bill bill, OAuth2Authentication authentication);

    void cancel(Bill bill, OAuth2Authentication authentication);

    void send(Bill bill, OAuth2Authentication authentication);
}
