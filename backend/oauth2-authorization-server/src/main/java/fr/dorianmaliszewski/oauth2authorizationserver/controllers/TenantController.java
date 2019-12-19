package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;
import fr.dorianmaliszewski.oauth2authorizationserver.services.TenantService;

/**
 * TenantController
 */
@RestController
@RequestMapping("/api/tenant")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        DTO<Tenant> dto = new DTO<>();
        dto.setItems(this.tenantService.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/mine")
    public ResponseEntity findMine(Principal principal) {
        return ResponseEntity.ok(this.tenantService.findByMainUser_Username(principal.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody TenantRequest tenantRequest,
            OAuth2Authentication authentication) {
        Optional<Tenant> optionalTenant = this.tenantService.findById(id);

        if (optionalTenant.isEmpty())
            return ResponseEntity.notFound().build();

        Tenant tenant = this.tenantService.update(optionalTenant.get(), tenantRequest, authentication);
        return ResponseEntity.ok(tenant);
    }
}