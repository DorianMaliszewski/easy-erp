package fr.dorianmaliszewski.oauth2authorizationserver.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetailsService {
    public UserDetails loadUserByUsername(String s);
}
