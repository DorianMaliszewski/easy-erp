package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;

/**
 * TenantController
 */
@RestController
@RequestMapping("/api/tenant")
public class TenantController {

    private final TenantRepository tenantRepository;

    public TenantController(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @GetMapping
    public ResponseEntity findAll() {
        DTO<Tenant> dto = new DTO<>();
        dto.setItems(this.tenantRepository.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/mine")
     public ResponseEntity findMine(Principal principal) {
         return ResponseEntity.ok("ok");
     }
}