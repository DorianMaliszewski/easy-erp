package com.easyerp.quoteservice.services;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.requests.QuoteRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.List;

public interface QuoteService {
    Quote create(QuoteRequest quoteRequest, OAuth2Authentication authentication);

    Quote update(Quote quote, QuoteRequest quoteRequest, OAuth2Authentication authentication);

    Quote accept(Quote quote, OAuth2Authentication authentication);

    Quote cancel(Quote quote, OAuth2Authentication authentication);

    Quote send(Quote quote, OAuth2Authentication authentication);

    ResponseEntity<byte[]> generatePDF(Long id, OAuth2Authentication authentication) throws Exception;

    List<Quote> findForMe(OAuth2Authentication authentication);

    ResponseEntity<byte[]> getPDFOrGenerateIt(Long id, OAuth2Authentication authentication);
}
