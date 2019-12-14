package com.easyerp.billservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillRequest {
    private Double price;
    private Long createdBy;
    private Long clientId;
    private List<BillLineRequest> lines;
    private Boolean isDraft;
}
