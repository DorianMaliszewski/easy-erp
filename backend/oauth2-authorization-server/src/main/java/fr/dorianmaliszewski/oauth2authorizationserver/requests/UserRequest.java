package fr.dorianmaliszewski.oauth2authorizationserver.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    private String username;
    private String firstName;
    private String lastName;
    private Long clientId;
    private String password;
    private String email;
    private String phoneNumber;
    private Long roleId;
    private Boolean sendPasswordByEmail;
}
