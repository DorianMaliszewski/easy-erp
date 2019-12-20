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
@RequestMapping("/api/bills")
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_CREATE_BILLS')")
    public ResponseEntity create(@RequestBody BillRequest billRequest, OAuth2Authentication authentication) {
        Bill bill = this.billService.create(billRequest, authentication);
        return ResponseEntity.ok(bill);
    }

    @PostMapping("from-quote")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_CREATE_BILLS')")
    public ResponseEntity createFromQuote(@RequestBody BillRequest billRequest, OAuth2Authentication authentication) {
        Bill bill = this.billService.createFromQuote(billRequest, authentication);
        return ResponseEntity.ok(bill);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_UPDATE_BILLS')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody BillRequest billRequest,
            OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty())
            return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.DRAFT)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        Bill bill = this.billService.update(optionalBill.get(), billRequest, authentication);
        return ResponseEntity.ok(bill);
    }

    @PatchMapping("/{id}/payed")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_MANAGE_BILLS')")
    public ResponseEntity payed(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty())
            return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.ACCEPTED)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(this.billService.payed(optionalBill.get(), authentication));
    }

    @PatchMapping("/{id}/send")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_SEND_BILLS', 'CAN_MANAGE_BILLS')")
    public ResponseEntity send(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty())
            return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.NEED_CONFIRMATION)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(this.billService.send(optionalBill.get(), authentication));
    }

    @PatchMapping("/{id}/accept")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER', 'CAN_MANAGE_BILLS')")
    public ResponseEntity accept(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty())
            return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.WAITING_CUSTOMER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(this.billService.accept(optionalBill.get(), authentication));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER','CAN_MANAGE_BILLS')")
    public ResponseEntity cancel(@PathVariable Long id, OAuth2Authentication authentication) {
        Optional<Bill> optionalBill = this.billRepository.findById(id);

        if (optionalBill.isEmpty())
            return ResponseEntity.notFound().build();
        if (optionalBill.get().getStatus() != BillStatus.WAITING_CUSTOMER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(this.billService.cancel(optionalBill.get(), authentication));
    }
}
