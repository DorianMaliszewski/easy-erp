package fr.dorianmaliszewski.oauth2authorizationserver.services.impl;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.Tenant;
import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.properties.FileStorageProperties;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.TenantRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.services.FileStorageService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path fileStorageLocation;
    private final TenantRepository tenantRepository;

    @Autowired
    public FileStorageServiceImpl(FileStorageProperties fileStorageProperties, TenantRepository tenantRepository) {
        System.out.println("File Storage Destination : " + fileStorageProperties.getUploadDir());
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.tenantRepository = tenantRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @SneakyThrows
    @Override
    public String storeFile(MultipartFile file, OAuth2Authentication authentication) {
        // Normalize file name
        Tenant tenant = this.tenantRepository.findByMainUser_Username(authentication.getName()).orElseThrow();
        this.createTenantDirectory(tenant.getName());
        String fileName = StringUtils.cleanPath(tenant.getName() + Objects.requireNonNull(file.getOriginalFilename()));

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new Exception("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new Exception("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @SneakyThrows
    @Override
    public String storeLogo(MultipartFile logo, OAuth2Authentication authentication) {
        Tenant tenant = this.tenantRepository.findByMainUser_Username(authentication.getName()).orElseThrow();
        this.createTenantDirectory(tenant.getName());
        String fileName = "logo.png";
        try {
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(tenant.getName() + "/" + fileName);
            System.out.println(targetLocation.toAbsolutePath().toString());
            Files.copy(logo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new Exception("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @SneakyThrows
    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new Exception("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new Exception("File not found " + fileName, ex);
        }
    }


    private void createTenantDirectory(String tenantName) {
        try {
            Files.createDirectories(Paths.get(this.fileStorageLocation + "/" + tenantName));
        } catch (UnsupportedOperationException | IOException | SecurityException ex) {
            ex.printStackTrace();
        }
    }
}
