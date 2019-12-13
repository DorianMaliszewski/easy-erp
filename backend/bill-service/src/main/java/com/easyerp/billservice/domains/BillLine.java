package com.easyerp.billservice.domains;

import com.easyerp.billservice.requests.BillLineRequest;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Entity
public class BillLine implements Serializable {
    @Id
    private int lineNumber;
    @Id
    @ManyToOne(targetEntity = Bill.class)
    private Bill bill;
    private String description;
    private int quantity;
    private Double unitaryPrice;

    public BillLine(BillLineRequest billLineRequest) {
        this.lineNumber = billLineRequest.getLineNumber();
        this.description = billLineRequest.getDescription();
        this.quantity = billLineRequest.getQuantity();
        this.unitaryPrice = billLineRequest.getUnitaryPrice();
    }
}
