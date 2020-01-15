package com.easyerp.quoteservice.controllers;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.dtos.DTO;
import com.easyerp.quoteservice.exceptions.ConflictException;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotes")
public class QuoteController {
    private final QuoteRepository quoteRepository;
    private final QuoteService quoteService;
    private final ObjectMapper objectMapper;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_READ_QUOTES')")
    public ResponseEntity findAll() {
        var dto = new DTO<Quote>();
        dto.setItems(this.quoteRepository.findAll());
        dto.setNumFound((long) dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_READ_QUOTES')")
    public ResponseEntity findOneById(@PathVariable Long id) {
        var quote = this.quoteRepository.findById(id);
        return quote.isPresent() ? ResponseEntity.ok(quote)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("The quote doesn't exist");
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_CREATE_QUOTES')")
    public ResponseEntity create(@RequestBody QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = this.quoteService.create(quoteRequest, authentication);
        return ResponseEntity.ok(quote);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_UPDATE_QUOTES')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody QuoteRequest quoteRequest,
            OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.update(quote, quoteRequest, authentication);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/send")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_SEND_QUOTES', 'CAN_MANAGE_QUOTES')")
    public ResponseEntity send(@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.send(quote, authentication);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/accept")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_MANAGE_QUOTES')")
    public ResponseEntity accept(@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.accept(quote, authentication);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/link-to-bill/{billId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_UPDATE_QUOTES')")
    public ResponseEntity linkToBill(@PathVariable Long id, @PathVariable Long billId,
            OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        if (quote.getBillId() != null) {
            throw new ConflictException();
        }
        quote.setBillId(billId);
        quote = this.quoteRepository.saveAndFlush(quote);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_MANAGE_QUOTES')")
    public ResponseEntity cancel(@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.cancel(quote, authentication);
        return ResponseEntity.ok(quote);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_DELETE_QUOTES')")
    public ResponseEntity delete(@PathVariable Long id) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote.setDeleted(true);
        this.quoteRepository.save(quote);
        return ResponseEntity.ok(true);
    }

    @GetMapping(value = "/{id}/generate-pdf", produces = "application/pdf")
    public ResponseEntity generatePDF(@PathVariable Long id, OAuth2Authentication authentication) {
        try {
            var responseEntity = this.quoteService.generatePDF(id, authentication);
            return responseEntity;
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Une erreur est survenue lors de la génération du PDF");
        }
    }

    @GetMapping(value = "/{id}/show-pdf", produces = "application/pdf")
    public ResponseEntity showLastPDF(@PathVariable Long id, OAuth2Authentication authentication) {
        try {
            var responseEntity = this.quoteService.getPDFOrGenerateIt(id, authentication);
            return responseEntity;
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Une erreur est survenue lors de la génération du PDF");
        }
    }

    @GetMapping("/for-me")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity findQuotesForMe(OAuth2Authentication authentication) {
        DTO<Quote> dto = new DTO<>();
        dto.setItems(this.quoteService.findForMe(authentication));
        dto.setNumFound((long) dto.getItems().size());
        return ResponseEntity.ok(dto);
    }
}
