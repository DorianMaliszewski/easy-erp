package fr.dorianmaliszewski.oauth2authorizationserver.services;

import lombok.SneakyThrows;
import org.springframework.core.io.Resource;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String storeFile(MultipartFile logo, OAuth2Authentication authentication);

    String storeLogo(MultipartFile logo, OAuth2Authentication authentication);

    @SneakyThrows
    Resource loadFileAsResource(String fileName);
}
