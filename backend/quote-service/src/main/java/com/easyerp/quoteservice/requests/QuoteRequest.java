package com.easyerp.quoteservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuoteRequest {
    private Double total;
    private Long createdBy;
    private Long clientId;
}
