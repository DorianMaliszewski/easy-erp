package fr.dorianmaliszewski.oauth2authorizationserver.domains;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Data
public class Permission extends BaseEntity{
    private String name;
}
