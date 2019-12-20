package com.easyerp.clientservice.services.impl;

import javax.persistence.EntityNotFoundException;

import com.easyerp.clientservice.domains.Client;
import com.easyerp.clientservice.exceptions.ClientNotFoundException;
import com.easyerp.clientservice.repositories.ClientRepository;
import com.easyerp.clientservice.requests.ClientRequest;
import com.easyerp.clientservice.services.ClientService;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public Client create(ClientRequest clientRequest, OAuth2Authentication authentication) {
        Client client = new Client(clientRequest);
        client.setCreatedBy(authentication.getName());
        return this.clientRepository.saveAndFlush(client);
    }

    @Override
    public Client update(Long id, ClientRequest clientRequest, OAuth2Authentication authentication) {
        Client client = this.clientRepository.findById(id).orElseThrow(ClientNotFoundException::new);
        client.setFromClientRequest(clientRequest);
        return this.clientRepository.saveAndFlush(client);
    }
}
