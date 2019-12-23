package com.easyerp.billservice.services;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.requests.BillRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public interface BillService {
    Bill create(BillRequest quoteRequest, OAuth2Authentication authentication);

    Bill update(Bill bill, BillRequest billRequest, OAuth2Authentication authentication);

    Bill publish(Bill bill, OAuth2Authentication authentication);

    Bill accept(Bill bill, OAuth2Authentication authentication);

    Bill cancel(Bill bill, OAuth2Authentication authentication);

    Bill send(Bill bill, OAuth2Authentication authentication);

    Bill createFromQuote(BillRequest billRequest, OAuth2Authentication authentication);

    Bill payed(Bill bill, OAuth2Authentication authentication);
}
