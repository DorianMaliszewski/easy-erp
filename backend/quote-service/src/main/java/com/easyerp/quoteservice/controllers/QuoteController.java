package com.easyerp.quoteservice.controllers;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.dtos.DTO;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {
    private final QuoteRepository quoteRepository;
    private final QuoteService quoteService;

    public QuoteController(QuoteRepository quoteRepository, QuoteService quoteService) {
        this.quoteRepository = quoteRepository;
        this.quoteService = quoteService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        var dto = new DTO<Quote>();
        dto.setItems(this.quoteRepository.findAll());
        dto.setNumFound((long) dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity findOneById(@PathVariable Long id) {
        var quote = this.quoteRepository.findById(id);
        return quote.isPresent() ? ResponseEntity.ok(quote) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("The quote doesn't exist");
    }

    @PostMapping
    public ResponseEntity create(@RequestBody QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = this.quoteService.create(quoteRequest, authentication);
        return ResponseEntity.ok(quote);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.update(quote, quoteRequest, authentication);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/send")
    public ResponseEntity send (@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.send(quote, authentication);
        return ResponseEntity.ok(quote);
    }

    @PatchMapping("/{id}/accept")
    public ResponseEntity accept (@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.accept(quote, authentication);
        return ResponseEntity.ok(quote);
    }


    @PatchMapping("/{id}/cancel")
    public ResponseEntity cancel (@PathVariable Long id, OAuth2Authentication authentication) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote = this.quoteService.cancel(quote, authentication);
        return ResponseEntity.ok(quote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Quote quote = this.quoteRepository.findById(id).orElseThrow();
        quote.setDeleted(true);
        this.quoteRepository.save(quote);
        return ResponseEntity.ok(true);
    }
}
