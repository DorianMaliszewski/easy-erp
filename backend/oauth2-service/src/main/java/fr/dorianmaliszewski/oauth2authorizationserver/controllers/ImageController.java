package fr.dorianmaliszewski.oauth2authorizationserver.controllers;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.UserRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Slf4j
public class ImageController {
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity findImage( HttpServletRequest request, @RequestParam String name) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(name);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    @GetMapping("/logo/mine")
    public ResponseEntity findLogo( HttpServletRequest request, OAuth2Authentication authentication) {
        // Load file as Resource
        User user = this.userRepository.findByUsername(authentication.getName()).orElseThrow();
        Resource resource = fileStorageService.loadFileAsResource(user.getTenant().getName() + "/logo.png");

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
