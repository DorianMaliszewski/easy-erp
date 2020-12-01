package fr.dorianmaliszewski.oauth2authorizationserver.services;

public interface EmailService {
    void sendSimpleMessage(
            String to, String subject, String text);
}
