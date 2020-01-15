package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.enums.RoleEnum;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity findAll() {
        var list = this.roleRepository.findAll();
        list.stream().filter(role -> role.getName() == RoleEnum.ROLE_SUPER_ADMIN).findFirst().ifPresent(list::remove);
        return ResponseEntity.ok(list);
    }
}
