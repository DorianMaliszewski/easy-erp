package fr.dorianmaliszewski.oauth2authorizationserver.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTO<T> {
    private int numFound;
    private List<T> items;
}
