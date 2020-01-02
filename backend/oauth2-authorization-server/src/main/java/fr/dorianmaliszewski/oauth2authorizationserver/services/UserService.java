package fr.dorianmaliszewski.oauth2authorizationserver.services;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;

public interface UserService {
    public User findByUsername(String username);
}
