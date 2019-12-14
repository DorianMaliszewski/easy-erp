package com.easyerp.quoteservice.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DTO<T> {
    private Long numFound;
    private List<T> items;
}
