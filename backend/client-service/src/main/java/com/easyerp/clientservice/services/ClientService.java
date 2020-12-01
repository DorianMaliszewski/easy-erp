package com.easyerp.clientservice.services;

import com.easyerp.clientservice.domains.Client;
import com.easyerp.clientservice.requests.ClientRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public interface ClientService {
    Client create(ClientRequest quoteRequest, OAuth2Authentication authentication);

    Client update(Long id, ClientRequest clientRequest, OAuth2Authentication authentication);
}
