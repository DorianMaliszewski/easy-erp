package com.easyerp.billservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillRequest {
    private Long clientId;
    private Double tva;
    private List<BillLineRequest> lines;
    private boolean draft;
    private Long quoteId;
}
