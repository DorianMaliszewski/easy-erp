package com.easyerp.quoteservice.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuoteLineRequest {
    private int lineNumber;
    private String description;
    private int quantity;
    private Double preTaxPrice;
}
