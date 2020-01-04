package com.easyerp.quoteservice.services.impl;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.domains.QuoteLine;
import com.easyerp.quoteservice.domains.QuoteLineCompositeKey;
import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.repositories.QuoteLineRepository;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import com.easyerp.quoteservice.utils.SecurityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class QuoteServiceImpl implements QuoteService {
    private final QuoteRepository quoteRepository;
    private final QuoteLineRepository quoteLineRepository;

    public QuoteServiceImpl(QuoteRepository quoteRepository, QuoteLineRepository quoteLineRepository) {
        this.quoteRepository = quoteRepository;
        this.quoteLineRepository = quoteLineRepository;
    }

    @Override
    public Quote create(QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = new Quote(quoteRequest);
        quote.setCreatedBy(authentication.getName());
        quote = this.quoteRepository.saveAndFlush(quote);
        return feedQuoteAndSave(quote, quoteRequest, authentication);
    }

    @Override
    public Quote update(Quote quote, QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        return feedQuoteAndSave(quote, quoteRequest, authentication);
    }

    @Override
    public Quote accept(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.ACCEPTED);
        return this.quoteRepository.saveAndFlush(quote);
    }

    @Override
    public Quote cancel(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.CANCELED);
        return this.quoteRepository.saveAndFlush(quote);
    }

    @Override
    public Quote send(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.WAITING_CUSTOMER);
        return this.quoteRepository.saveAndFlush(quote);
    }

    private Quote feedQuoteAndSave(Quote quote, QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        var lines = quoteRequest.getLines().parallelStream().map(quoteLineRequest -> {
            var key = new QuoteLineCompositeKey();
            key.setQuote(quote);
            key.setLineNumber(quoteLineRequest.getLineNumber());

            QuoteLine quoteLine = this.quoteLineRepository.findById(key).orElse(new QuoteLine());

            quoteLine.setLineNumber(quoteLineRequest.getLineNumber());
            quoteLine.setDescription(quoteLineRequest.getDescription());
            quoteLine.setPreTaxPrice(quoteLineRequest.getPreTaxPrice());
            quoteLine.setQuantity(quoteLineRequest.getQuantity());
            quoteLine.setQuote(quote);

            return quoteLine;
        }).collect(Collectors.toList());

        quote.getLines().clear();
        quote.getLines().addAll(this.quoteLineRepository.saveAll(lines));

        quote.setTva(quoteRequest.getTva());
        quote.setTotal(quote.getLines().stream()
                .mapToDouble(
                        quoteLine -> quoteLine.getQuantity() * quoteLine.getPreTaxPrice() * (1 + quoteRequest.getTva()))
                .sum());

        if (quoteRequest.isDraft()) {
            quote.setStatus(QuoteStatus.DRAFT);
        } else {
            // TODO : Retrieve user parameter if they don't want confirmation
            if (SecurityUtils.isMoreThanOrEqualManager(authentication.getUserAuthentication().getAuthorities())) {
                quote.setStatus(QuoteStatus.WAITING_CUSTOMER);
            } else {
                quote.setStatus(QuoteStatus.NEED_CONFIRMATION);
            }
        }

        return this.quoteRepository.saveAndFlush(quote);
    }
}
