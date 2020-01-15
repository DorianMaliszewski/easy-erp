package fr.dorianmaliszewski.oauth2authorizationserver.domains;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class Subscription implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Double price;
}
