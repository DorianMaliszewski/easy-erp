package fr.dorianmaliszewski.oauth2authorizationserver.repositories;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Role;
import fr.dorianmaliszewski.oauth2authorizationserver.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleEnum roleEnum);
}
