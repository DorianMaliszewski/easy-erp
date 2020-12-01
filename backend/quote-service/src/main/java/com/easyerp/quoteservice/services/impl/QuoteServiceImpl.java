package com.easyerp.quoteservice.services.impl;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.domains.QuoteLine;
import com.easyerp.quoteservice.domains.QuoteLineCompositeKey;
import com.easyerp.quoteservice.domains.QuotePdf;
import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.exceptions.QuoteLockedException;
import com.easyerp.quoteservice.repositories.QuoteLineRepository;
import com.easyerp.quoteservice.repositories.QuotePDFRepository;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.PdfRequest;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import com.easyerp.quoteservice.utils.SecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {
    private final QuoteRepository quoteRepository;
    private final QuoteLineRepository quoteLineRepository;
    private final QuotePDFRepository quotePDFRepository;
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
        if (quote.isLocked()) {
            throw new QuoteLockedException();
        }
        return feedQuoteAndSave(quote, quoteRequest, authentication);
    }

    @Override
    public Quote accept(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.ACCEPTED);
        quote.setLocked(true);
        return this.quoteRepository.saveAndFlush(quote);
    }

    @Override
    public Quote cancel(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.CANCELED);
        quote.setLocked(false);
        return this.quoteRepository.saveAndFlush(quote);
    }

    @Override
    public Quote send(Quote quote, OAuth2Authentication authentication) {
        quote.setStatus(QuoteStatus.WAITING_CUSTOMER);
        quote.setLocked(true);
        return this.quoteRepository.saveAndFlush(quote);
    }

    @Override
    public ResponseEntity<byte[]> generatePDF(Long id, OAuth2Authentication authentication) throws Exception {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();

        // Reference du devis
        String quoteReference = "DEV" + quote.getId() + "-" + String.format("%05d", quote.getVersion());

        Map data = new HashMap<String, Object>();

        data.put("access_token", ((OAuth2AuthenticationDetails)authentication.getDetails()).getTokenValue());
        data.put("quoteReference", quoteReference);

        // Recupération des informations utilisateurs
        data.put("user",this.objectMapper.convertValue(authentication.getUserAuthentication().getDetails(), Map.class));

        // Récupération des informations clients
        var customerData = restTemplate.getForEntity("http://api.easy-erp.lan/client-service/api/clients/" + quote.getClientId(), Map.class).getBody();
        data.put("customer", this.objectMapper.convertValue(customerData, Map.class));

        // Récupération des informations sur le devis
        data.put("quote", this.objectMapper.convertValue(quote, Map.class));

        HttpEntity<PdfRequest> httpEntity = new HttpEntity<>(PdfRequest.builder().data(data).filename(quote.getClientId() + "/" + quoteReference + ".pdf").template("devis").build());
        var file = restTemplate.exchange("http://api.easy-erp.lan/pdf-service/pdf/get-or-generate", HttpMethod.POST, httpEntity, byte[].class);

        if (file.getBody() != null) {
            //Enregistrement en base de données
            QuotePdf quotePdf = new QuotePdf();
            quotePdf.setCreatedBy(authentication.getName());
            quotePdf.setFileName(quoteReference + ".pdf");
            quotePdf.setQuote(quote);
            quotePdf.setQuoteVersion(quote.getVersion());
            this.quotePDFRepository.save(quotePdf);
            return file;
        }
        return null;
    }

    @Override
    public List<Quote> findForMe(OAuth2Authentication authentication) {
        Map userInfo = this.objectMapper.convertValue(authentication.getUserAuthentication().getDetails(), Map.class);
        if (userInfo.get("clientId") == null) {
            return new ArrayList<>();
        }
        return this.quoteRepository.findByClientId((Long) userInfo.get("clientId"));
    }

    @SneakyThrows
    @Override
    public ResponseEntity<byte[]> getPDFOrGenerateIt(Long id, OAuth2Authentication authentication) {
        Optional<QuotePdf> quotePdf = this.quotePDFRepository.findFirstByQuote_IdOrderByIdDesc(id);
        if (quotePdf.isEmpty() || (!quotePdf.get().getQuoteVersion().equals(quotePdf.get().getQuote().getVersion()) && !quotePdf.get().getQuote().isLocked())) {
            return this.generatePDF(id, authentication);
        } else {
            try {
                var file = restTemplate.exchange("http://api.easy-erp.lan/pdf-service/pdf/" + quotePdf.get().getQuote().getClientId() + "/" + quotePdf.get().getFileName(), HttpMethod.GET,  null,byte[].class);
                return file.getBody() != null ? file : this.generatePDF(id, authentication);
            } catch (HttpClientErrorException.NotFound e) {
                return this.generatePDF(id, authentication);
            }
        }
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
        quote.setLocked(false);
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
                quote.setLocked(true);
                quote.setStatus(QuoteStatus.WAITING_CUSTOMER);
            } else {
                quote.setStatus(QuoteStatus.NEED_CONFIRMATION);
            }
        }

        return this.quoteRepository.saveAndFlush(quote);
    }

}
