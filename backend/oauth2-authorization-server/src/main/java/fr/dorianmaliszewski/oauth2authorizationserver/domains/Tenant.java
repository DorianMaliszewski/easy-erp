package fr.dorianmaliszewski.oauth2authorizationserver.domains;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.TenantRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
public class Tenant extends BaseEntity {

    private Boolean deleted = false;
    private Boolean enabled = true;

    private String name;

    @Column(length = 20)
    private String phone;

    @Column(length = 50)
    private String email;
    private String site;
    private String address;

    @Column(length = 10)
    private String postalCode;

    private String instanceUrl;


    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "main_user_id")
    @JsonIgnoreProperties({"tenant"})
    private User mainUser;

    @OneToMany(targetEntity = User.class, mappedBy = "tenant")
    @JsonIdentityReference(alwaysAsId = true)
    private List<User> users;

    @ManyToOne
    private Subscription subscription;

    public Tenant(TenantRequest tenantRequest) {
        super();
        this.name = tenantRequest.getName();
        this.phone = tenantRequest.getPhone();
        this.email = tenantRequest.getEmail();
        this.site = tenantRequest.getSite();
        this.address = tenantRequest.getAddress();
        this.postalCode = tenantRequest.getPostalCode();
    }
}
