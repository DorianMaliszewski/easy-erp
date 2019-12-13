package fr.dorianmaliszewski.oauth2authorizationserver.services;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;

public interface InstanceService {
    public Tenant create(TenantRequest tenantRequest);
}
