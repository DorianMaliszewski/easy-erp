package com.easyerp.quoteservice.services;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.requests.QuoteRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public interface QuoteService {
    Quote create(QuoteRequest quoteRequest, OAuth2Authentication authentication);
}
