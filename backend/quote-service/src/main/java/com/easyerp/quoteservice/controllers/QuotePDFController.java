package com.easyerp.quoteservice.controllers;

import com.easyerp.quoteservice.repositories.QuotePDFRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class QuotePDFController {

    private final QuotePDFRepository quotePDFRepository;

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        var pdf = this.quotePDFRepository.findById(id);
        return pdf.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(pdf.get());
    }

    @GetMapping("/last-of-quote/{id}")
    public ResponseEntity findLastOfQuote(@PathVariable Long id) {
        var pdf = this.quotePDFRepository.findFirstByQuote_IdOrderByIdDesc(id);
        return pdf.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(pdf.get());
    }
}
