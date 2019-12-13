package fr.dorianmaliszewski.oauth2authorizationserver.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "oauth_user")
public class User extends BaseEntity implements UserDetails {

    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Boolean accountExpired;
    private Boolean accountLocked;
    private Boolean credentialsExpired;
    private Boolean enabled;
    private Long clientId;

    @ManyToOne(targetEntity = Tenant.class)
    @JsonIgnoreProperties({"users", "mainUser"})
    private Tenant tenant;

    @ManyToOne(targetEntity = Role.class)
    private Role role;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_permissions",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id")
    )
    private List<Permission> permissions = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        if (role != null) {
            authorities.add(new SimpleGrantedAuthority(role.getName().name()));
        }
        this.permissions.forEach(permission -> {
            authorities.add(new SimpleGrantedAuthority(permission.getName()));
        });

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !accountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !credentialsExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
