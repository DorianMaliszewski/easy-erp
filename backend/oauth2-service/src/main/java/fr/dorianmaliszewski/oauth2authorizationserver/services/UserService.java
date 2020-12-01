package fr.dorianmaliszewski.oauth2authorizationserver.services;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.UserRequest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public interface UserService {
    User createCustomerUser(UserRequest user, OAuth2Authentication authentication);

    User createInternalUser(UserRequest user, OAuth2Authentication authentication);

    User updateInternalUser(Long id, UserRequest userRequest, OAuth2Authentication authentication);

    User updateCustomerUser(Long id, UserRequest userRequest, OAuth2Authentication authentication);

    public User findByUsername(String username);
}
