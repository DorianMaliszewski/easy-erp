package com.easyerp.billservice.responses;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DTO<T> {
    private int numFound;
    private List<T> items;
}
