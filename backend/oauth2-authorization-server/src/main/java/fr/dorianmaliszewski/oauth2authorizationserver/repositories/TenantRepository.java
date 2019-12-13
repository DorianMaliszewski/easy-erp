package fr.dorianmaliszewski.oauth2authorizationserver.repositories;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
}
