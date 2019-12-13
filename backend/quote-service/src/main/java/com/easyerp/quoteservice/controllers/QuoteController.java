package com.easyerp.quoteservice.controllers;

import com.easyerp.quoteservice.domains.Quote;
import com.easyerp.quoteservice.repositories.QuoteRepository;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.easyerp.quoteservice.services.QuoteService;
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
        return ResponseEntity.ok(this.quoteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity findOneById(@PathVariable Long id) {
        return ResponseEntity.ok(this.quoteRepository.findById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody QuoteRequest quoteRequest, OAuth2Authentication authentication) {
        Quote quote = this.quoteService.create(quoteRequest, authentication);
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
