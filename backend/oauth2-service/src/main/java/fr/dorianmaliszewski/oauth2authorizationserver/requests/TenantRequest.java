package fr.dorianmaliszewski.oauth2authorizationserver.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TenantRequest {
    private String name;
    private Long mainUserId;
    private String phone;
    private String email;
    private String site;
    private String address;
    private String postalCode;
    private String logo;
}
