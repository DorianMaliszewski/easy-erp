package com.easyerp.clientservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClientRequest {
    private String name;
    private Long contact;
    private String phone;
    private String email;
    private String site;
    private String address;
    private String postalCode;
    private String city;
}
