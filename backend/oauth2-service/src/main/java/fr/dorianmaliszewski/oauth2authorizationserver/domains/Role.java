package fr.dorianmaliszewski.oauth2authorizationserver.domains;

import fr.dorianmaliszewski.oauth2authorizationserver.enums.RoleEnum;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Role extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    private RoleEnum name;

    private String description;

}
