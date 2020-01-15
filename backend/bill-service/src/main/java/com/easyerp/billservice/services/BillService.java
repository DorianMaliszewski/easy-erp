package com.easyerp.billservice.services;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.requests.BillRequest;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.List;

public interface BillService {
    Bill create(BillRequest quoteRequest, OAuth2Authentication authentication);

    Bill update(Bill bill, BillRequest billRequest, OAuth2Authentication authentication);

    Bill publish(Bill bill, OAuth2Authentication authentication);

    Bill accept(Bill bill, OAuth2Authentication authentication);

    Bill cancel(Bill bill, OAuth2Authentication authentication);

    Bill send(Bill bill, OAuth2Authentication authentication);

    Bill createFromQuote(BillRequest billRequest, OAuth2Authentication authentication);

    Bill payed(Bill bill, OAuth2Authentication authentication);

    ResponseEntity<byte[]> generatePDF(Long id, OAuth2Authentication authentication) throws Exception;

    @SneakyThrows
    ResponseEntity<byte[]> getPDFOrGenerateIt(Long id, OAuth2Authentication authentication);

    List<Bill> findForMe(OAuth2Authentication authentication);
}
