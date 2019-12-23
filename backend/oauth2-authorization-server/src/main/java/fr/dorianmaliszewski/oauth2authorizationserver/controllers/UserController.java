package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.UserRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.UserRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.responses.DTO;

import fr.dorianmaliszewski.oauth2authorizationserver.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
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

    @PostMapping("/customers")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity createCustomerUser(@RequestBody UserRequest user, OAuth2Authentication authentication) {
        User newUser = this.userService.createCustomerUser(user, authentication);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/internal")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity createInternalUser(@RequestBody UserRequest user, OAuth2Authentication authentication) {
        User newUser = this.userService.createInternalUser(user, authentication);
        return ResponseEntity.ok(newUser);
    }


    @PutMapping("/customers/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity updateCustomerUser(@RequestBody UserRequest user, @PathVariable Long id, OAuth2Authentication authentication) {
        User updatedUser = this.userService.updateCustomerUser(id, user, authentication);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/internal/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity updateInternalUser(@RequestBody UserRequest user, @PathVariable Long id, OAuth2Authentication authentication) {
        User updatedUser = this.userService.updateInternalUser(id, user, authentication);
        return ResponseEntity.ok(updatedUser);
    }
}
