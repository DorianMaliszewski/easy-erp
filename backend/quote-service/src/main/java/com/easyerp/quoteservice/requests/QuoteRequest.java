package com.easyerp.quoteservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuoteRequest {
    private Long clientId;
    private Double tva;
    private boolean draft;
    private List<QuoteLineRequest> lines;
}
