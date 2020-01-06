package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;
import fr.dorianmaliszewski.oauth2authorizationserver.services.FileStorageService;
import fr.dorianmaliszewski.oauth2authorizationserver.services.TenantService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


/**
 * TenantController
 */
@RestController
@RequestMapping("/api/tenant")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;
    private final FileStorageService fileStorageService;


    @GetMapping
    public ResponseEntity findAll() {
        DTO<Tenant> dto = new DTO<>();
        dto.setItems(this.tenantService.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/mine")

    public ResponseEntity findMine(Principal principal) throws EntityNotFoundException {
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

    @PutMapping("/mine/upload-logo")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity uploadLogo(@RequestParam("logo") MultipartFile logo, OAuth2Authentication authentication) {
        String logoName = fileStorageService.storeLogo(logo, authentication);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/images/logo/mine")
                .path(logoName)
                .toUriString();
        this.tenantService.updateLogo(fileDownloadUri, authentication);
        return ResponseEntity.ok(fileDownloadUri);
    }
}