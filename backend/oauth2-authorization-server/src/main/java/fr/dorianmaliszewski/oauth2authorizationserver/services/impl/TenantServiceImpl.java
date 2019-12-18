package fr.dorianmaliszewski.oauth2authorizationserver.services.impl;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.services.TenantService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TenantServiceImpl implements TenantService {
    private final TenantRepository tenantRepository;

    public TenantServiceImpl(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Override
    public Tenant create(TenantRequest tenantRequest, OAuth2Authentication authentication) {
        Tenant tenant = new Tenant(tenantRequest);
        tenant.setCreatedAt(new Date());
        // tenant.setMainUser(authentication.getName());
        return this.tenantRepository.saveAndFlush(tenant);
    }

    @Override
    public Tenant update(Tenant tenant, TenantRequest tenantRequest, OAuth2Authentication authentication) {
        tenant.setAddress(tenantRequest.getAddress());
        tenant.setPostalCode(tenantRequest.getPostalCode());
        tenant.setEmail(tenantRequest.getEmail());
        tenant.setLogo(tenantRequest.getLogo());
        tenant.setPhone(tenantRequest.getPhone());
        tenant.setName(tenantRequest.getName());

        tenant.setUpdatedAt(new Date());

        return this.tenantRepository.saveAndFlush(tenant);
    }

    @Override
    public List<Tenant> findAll() {
        return this.tenantRepository.findAll();
    }

    @Override
    public Tenant findByMainUser_Username(String username) {
        return this.tenantRepository.findByMainUser_Username(username);
    }

    @Override
    public Optional<Tenant> findById(Long id) {
        return this.tenantRepository.findById(id);
    }
}
