package com.easyerp.quoteservice.services.impl;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.domains.QuoteLine;
import com.easyerp.quoteservice.domains.QuoteLineCompositeKey;
import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.repositories.QuoteLineRepository;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import com.easyerp.quoteservice.utils.PdfGeneratorUtils;
import com.easyerp.quoteservice.utils.SecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {
    private final QuoteRepository quoteRepository;
    private final QuoteLineRepository quoteLineRepository;
    private final PdfGeneratorUtils pdfGeneratorUtils;
    private final ObjectMapper objectMapper;
    private final OAuth2RestOperations restTemplate;


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

    @Override
    public ByteArrayOutputStream generatePDF(Long id, OAuth2Authentication authentication) throws Exception {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();

        Map data = new HashMap<String, Object>();
        data.put("user",this.objectMapper.convertValue(authentication.getUserAuthentication().getDetails(), Map.class));

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        var customerData = restTemplate.getForEntity("http://api.easy-erp.lan/client-service/api/clients/" + quote.getClientId(), Map.class).getBody();

        data.put("customer", this.objectMapper.convertValue(customerData, Map.class));
        data.put("quote", this.objectMapper.convertValue(quote, Map.class));
        System.out.println(this.objectMapper.convertValue(data, Map.class));
        var byteArrayOutputStream = this.pdfGeneratorUtils.createPdf("devis", data);
        return byteArrayOutputStream;
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
