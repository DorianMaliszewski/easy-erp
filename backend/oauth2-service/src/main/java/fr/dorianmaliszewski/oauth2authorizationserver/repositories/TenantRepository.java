package fr.dorianmaliszewski.oauth2authorizationserver.repositories;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;

import java.util.Optional;
import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Optional<Tenant> findByMainUser_Username(String userName);
}
