package com.easyerp.billservice.controllers;

import com.easyerp.billservice.domains.Bill;
import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.repositories.BillRepository;
import com.easyerp.billservice.requests.BillRequest;
import com.easyerp.billservice.responses.DTO;
import com.easyerp.billservice.services.BillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/bill")
public class BillController {

    private final BillRepository billRepository;
    private final BillService billService;

    public BillController(BillRepository billRepository, BillService billService) {
        this.billRepository = billRepository;
        this.billService = billService;
    }

    @GetMapping
    @PreAuthorize("!hasAnyAuthority('ROLE_CLIENT', 'ROLE_USER', 'ROLE_SUPPORT')")
    public ResponseEntity findAll() {
        DTO<Bill> dto = new DTO<>();
        dto.setItems(this.billRepository.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    @PreAuthorize("!hasAnyAuthority('ROLE_CLIENT', 'ROLE_USER', 'ROLE_SUPPORT')")
    public ResponseEntity findOneById(@PathVariable Long id) {
        return ResponseEntity.ok(this.billRepository.findById(id));
    }

    @PostMapping
    @PreAuthorize("!hasAuthority('ROLE_CLIENT')")
    public ResponseEntity create(@RequestBody BillRequest billRequest, OAuth2Authentication authentication) {
        Bill bill = this.billService.create(billRequest, authentication);
        return ResponseEntity.ok(bill);
    }

    @PutMapping("/{id}")
    @PreAuthorize("!hasAuthority('ROLE_CLIENT')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody BillRequest billRequest, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill= this.billRepository.findById(id);

        if (optionalBill.isEmpty()) return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.DRAFT) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        Bill bill = this.billService.update(optionalBill.get(), billRequest, authentication);
        return ResponseEntity.ok(bill);
    }

    @PatchMapping("/{id}/publish")
    @PreAuthorize("!hasAuthority('ROLE_CLIENT')")
    public ResponseEntity publish(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty()) return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.DRAFT) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        this.billService.publish(optionalBill.get(), authentication);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/send")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_SEND_BILLS')")
    public ResponseEntity send(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty()) return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.NEED_CONFIRMATION) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        this.billService.send(optionalBill.get(), authentication);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/accept")
    @PreAuthorize("hasAnyAuthority('ROLE_CLIENT')")
    public ResponseEntity accept(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty()) return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.WAITING_CUSTOMER) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        this.billService.accept(optionalBill.get(), authentication);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_CLIENT')")
    public ResponseEntity cancel(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty()) return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.WAITING_CUSTOMER) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        this.billService.cancel(optionalBill.get(), authentication);
        return ResponseEntity.ok().build();
    }
}
