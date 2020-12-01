package fr.dorianmaliszewski.oauth2authorizationserver.services;


import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.List;
import java.util.Optional;

import org.springframework.security.oauth2.provider.OAuth2Authentication;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;

public interface TenantService {
    Tenant create(TenantRequest tenantRequest, OAuth2Authentication authentication);

    Tenant update(Tenant tenant, TenantRequest tenantRequest, OAuth2Authentication authentication);

    List<Tenant> findAll();

    Tenant findByMainUser_Username(String username);

    Optional<Tenant> findById(Long id);

    void updateLogo(String fileDownloadUri, OAuth2Authentication authentication);
}
