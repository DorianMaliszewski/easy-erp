package fr.dorianmaliszewski.oauth2authorizationserver.services.impl;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.services.TenantService;
import fr.dorianmaliszewski.oauth2authorizationserver.services.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final UserService userService;

    @Override
    public Tenant create(TenantRequest tenantRequest, OAuth2Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        Tenant tenant = new Tenant(tenantRequest);
        tenant.setCreatedAt(new Date());
        tenant.setMainUser(user);

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
        tenant.setSite(tenantRequest.getSite());

        tenant.setUpdatedAt(new Date());

        return this.tenantRepository.saveAndFlush(tenant);
    }

    @Override
    public List<Tenant> findAll() {
        return this.tenantRepository.findAll();
    }

    @Override
    public Tenant findByMainUser_Username(String username) throws EntityNotFoundException {
        Optional<Tenant> optionalTenant = this.tenantRepository.findByMainUser_Username(username);

        if (optionalTenant.isEmpty()) {
            throw new EntityNotFoundException("Entity not Found");
        }

        return optionalTenant.get();
    }

    @Override
    public Optional<Tenant> findById(Long id) {
        return this.tenantRepository.findById(id);
    }
}
