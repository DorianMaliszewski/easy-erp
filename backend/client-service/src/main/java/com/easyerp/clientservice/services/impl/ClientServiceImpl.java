package com.easyerp.clientservice.services.impl;

import com.easyerp.clientservice.domains.Client;
import com.easyerp.clientservice.repositories.ClientRepository;
import com.easyerp.clientservice.requests.ClientRequest;
import com.easyerp.clientservice.services.ClientService;
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
        return this.clientRepository.save(client);
    }
}
