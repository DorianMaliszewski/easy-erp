package com.easyerp.clientservice.controllers;

import com.easyerp.clientservice.domains.Client;
import com.easyerp.clientservice.dtos.DTO;
import com.easyerp.clientservice.exceptions.ClientNotFoundException;
import com.easyerp.clientservice.repositories.ClientRepository;
import com.easyerp.clientservice.requests.ClientRequest;
import com.easyerp.clientservice.services.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientRepository clientRepository;
    private final ClientService clientService;

    public ClientController(ClientRepository clientRepository, ClientService clientService) {
        this.clientRepository = clientRepository;
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        DTO<Client> dto = new DTO<>();
        dto.setItems(this.clientRepository.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity findOneById(@PathVariable Long id) {
        var client = this.clientRepository.findById(id).orElseThrow(ClientNotFoundException::new);
        return ResponseEntity.ok(client);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody ClientRequest clientRequest, OAuth2Authentication authentication) {
        Client client = this.clientService.create(clientRequest, authentication);
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody ClientRequest clientRequest,
            OAuth2Authentication authentication) {
        Client client = this.clientService.update(id, clientRequest, authentication);
        return ResponseEntity.ok(client);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Client client = this.clientRepository.findById(id).orElseThrow();
        client.setDeleted(true);
        this.clientRepository.save(client);
        return ResponseEntity.ok(true);
    }
}
