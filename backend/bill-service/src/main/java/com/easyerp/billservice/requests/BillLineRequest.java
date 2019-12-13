package com.easyerp.billservice.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BillLineRequest {
    private int lineNumber;
    private String description;
    private int quantity;
    private Double unitaryPrice;
}
