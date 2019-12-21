package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.UserRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity findAll() {
        DTO<User> dto = new DTO<>();
        dto.setItems(this.userRepository.findAll());
        dto.setNumFound(dto.getItems().size());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/me")
    public Optional<User> findMe(Principal principal) {
        return this.userRepository.findByUsername(principal.getName());
    }
}
