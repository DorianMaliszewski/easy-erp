package com.easyerp.billservice.domains;

import com.easyerp.billservice.requests.BillLineRequest;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "bill_line")
@IdClass(BillLineCompositeKey.class)
@NoArgsConstructor
public class BillLine implements Serializable {
    @Id
    private int lineNumber;
    @Id
    @ManyToOne(targetEntity = Bill.class)
    @JsonIgnore
    private Bill bill;

    private String description;
    private int quantity;
    private Double preTaxPrice;

    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
    @Version
    private Integer version;

    public BillLine(BillLineRequest billLineRequest) {
        this.lineNumber = billLineRequest.getLineNumber();
        this.description = billLineRequest.getDescription();
        this.quantity = billLineRequest.getQuantity();
        this.preTaxPrice = billLineRequest.getPreTaxPrice();
    }
}
