package com.easyerp.clientservice.domains;

import com.easyerp.clientservice.requests.ClientRequest;
import lombok.*;

import javax.persistence.Entity;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Client extends BaseEntity {

    private String name;
    private Long contact;
    private String phone;
    private String email;
    private String site;
    private String city;
    private String address;
    private String postalCode;
    private Boolean enabled = true;
    private Boolean deleted = false;
    private Long createdBy;

    public Client(ClientRequest clientRequest) {
        this.name = clientRequest.getName();
        this.contact = clientRequest.getContact();
        this.phone = clientRequest.getPhone();
        this.email = clientRequest.getEmail();
        this.site = clientRequest.getSite();
        this.city = clientRequest.getCity();
        this.address = clientRequest.getAddress();
        this.postalCode = clientRequest.getPostalCode();
    }
}
