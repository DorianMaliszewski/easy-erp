package com.easyerp.billservice.controllers;

import com.easyerp.billservice.repositories.BillPdfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class BillPDFController {

    private final BillPdfRepository billPdfRepository;

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        var pdf = this.billPdfRepository.findById(id);
        return pdf.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(pdf.get());
    }

    @GetMapping("/last-of-billl/{id}")
    public ResponseEntity findLastOfBill(@PathVariable Long id) {
        var pdf = this.billPdfRepository.findFirstByBill_IdOrderByIdDesc(id);
        return pdf.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(pdf.get());
    }
}
