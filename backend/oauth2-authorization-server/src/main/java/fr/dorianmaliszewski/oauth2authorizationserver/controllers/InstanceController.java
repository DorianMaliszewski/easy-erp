package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;
import fr.dorianmaliszewski.oauth2authorizationserver.services.InstanceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
@PreAuthorize("#oauth2.hasScope('admin')")
@Api("Opérations sur les clients")
public class InstanceController {

    private final TenantRepository tenantRepository;
    private final InstanceService instanceService;

    public InstanceController(TenantRepository tenantRepository, InstanceService instanceService) {
        this.tenantRepository = tenantRepository;
        this.instanceService = instanceService;
    }


    @GetMapping
    @ApiOperation(value = "Retourne toutes les instances", response = DTO.class)
    public ResponseEntity findAll() {
        DTO<Tenant> clientDTO = new DTO<>();
        clientDTO.setItems(this.tenantRepository.findAll());
        clientDTO.setNumFound(clientDTO.getItems().size());
        return ResponseEntity.ok(clientDTO);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Retourne l'tenant correspondant à l'id si il existe", response = Tenant.class)
    public ResponseEntity findOneById(@PathVariable Long id) {
        return ResponseEntity.ok(this.tenantRepository.findById(id));
    }

    @PostMapping
    @ApiOperation(value = "Créer une nouvelle tenant", response = Tenant.class)
    public ResponseEntity create(@RequestBody TenantRequest tenantRequest) {
        Tenant newTenant = this.instanceService.create(tenantRequest);
        return ResponseEntity.ok(newTenant);
    }
}
