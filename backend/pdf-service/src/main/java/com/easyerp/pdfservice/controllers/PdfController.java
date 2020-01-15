package com.easyerp.pdfservice.controllers;

import com.easyerp.pdfservice.requests.PdfRequest;
import com.easyerp.pdfservice.services.PdfService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import static java.nio.file.Files.readAllBytes;

@RestController
@RequestMapping("/pdf")
@RequiredArgsConstructor
public class PdfController {

    private final PdfService pdfService;
    private final ObjectMapper objectMapper;

    @PostMapping("/generate")
    public ResponseEntity generatePDF(@RequestBody PdfRequest pdfRequest) {
        try {
            File file = this.pdfService.generatePdf(pdfRequest.getTemplate(), pdfRequest.getData(), pdfRequest.getFilename());
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Content-Type", "application/pdf");
            responseHeaders.set("Content-Disposition","attachment;filename=" + file.getName());

            ByteArrayResource resource = new ByteArrayResource(readAllBytes(Paths.get(file.getAbsolutePath())));

            return ResponseEntity.ok().headers(responseHeaders).body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Une erreur est survenue lors de la génération du PDF");
        }
    }

    @PostMapping("/get-or-generate")
    public ResponseEntity getOrgeneratePDF(@RequestBody PdfRequest pdfRequest) {
        try {
            File file = this.pdfService.getPdfOrGenerate(pdfRequest.getTemplate(), pdfRequest.getData(), pdfRequest.getFilename());
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Content-Type", "application/pdf");
            responseHeaders.set("Content-Disposition","attachment;filename=" + file.getName());

            ByteArrayResource resource = new ByteArrayResource(readAllBytes(Paths.get(file.getAbsolutePath())));

            return ResponseEntity.ok().headers(responseHeaders).body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Une erreur est survenue lors de la génération du PDF");
        }
    }

    @GetMapping("/{clientId}/{filename}")
    public ResponseEntity findByClientAndFilename(@PathVariable Long clientId, @PathVariable String filename) {
        try {
            File file = this.pdfService.getPdf(clientId + "/" + filename);
            if (file.exists()) {
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("Content-Type", "application/pdf");
                responseHeaders.set("Content-Disposition","attachment;filename=" + file.getName());
                ByteArrayResource resource = null;
                resource = new ByteArrayResource(readAllBytes(Paths.get(file.getAbsolutePath())));
                return ResponseEntity.ok().headers(responseHeaders).body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pdf doesn't exist");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when getting PDF");
        }
    }

    @GetMapping("/{filename}")
    public ResponseEntity findByFilename(@PathVariable String filename) {
        try {
            File file = this.pdfService.getPdf(filename);
            if (file.exists()) {
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("Content-Type", "application/pdf");
                responseHeaders.set("Content-Disposition","attachment;filename=" + file.getName());
                ByteArrayResource resource = null;
                resource = new ByteArrayResource(readAllBytes(Paths.get(file.getAbsolutePath())));
                return ResponseEntity.ok().headers(responseHeaders).body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pdf doesn't exist");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when getting PDF");
        }
    }
}
