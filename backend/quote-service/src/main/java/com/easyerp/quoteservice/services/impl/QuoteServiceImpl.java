package com.easyerp.quoteservice.services.impl;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.domains.User;
import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import com.easyerp.quoteservice.utils.SecurityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class QuoteServiceImpl implements QuoteService {
    private final QuoteRepository quoteRepository;

    public QuoteServiceImpl(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @Override
    public Quote create(QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = new Quote(quoteRequest);
        // User user = (User) authentication.getPrincipal();

        // TODO : Retrieve user parameter if they don't want confirmation
        if (SecurityUtils.isMoreThanOrEqualManager((Collection<GrantedAuthority>) authentication.getUserAuthentication().getAuthorities())) {
            quote.setStatus(QuoteStatus.WAITING_CUSTOMER);
        } else {
            quote.setStatus(QuoteStatus.NEDD_CONFIRMATION);
        }

        return this.quoteRepository.save(quote);
    }
}
