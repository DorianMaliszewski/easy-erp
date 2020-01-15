package fr.dorianmaliszewski.oauth2authorizationserver.services.impl;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.UserRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.services.InstanceService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstanceServiceImpl implements InstanceService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;

    @Override
    public Tenant create(TenantRequest tenantRequest) {
        Tenant tenant = new Tenant(tenantRequest);
        tenant.setMainUser(this.userRepository.findById(tenantRequest.getMainUserId()).orElseThrow());
        return this.tenantRepository.save(tenant);
    }
}
