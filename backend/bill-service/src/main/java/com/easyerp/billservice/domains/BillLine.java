package com.easyerp.billservice.domains;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.easyerp.billservice.requests.BillLineRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

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

    public BillLine(final BillLineRequest billLineRequest) {
        this.lineNumber = billLineRequest.getLineNumber();
        this.description = billLineRequest.getDescription();
        this.quantity = billLineRequest.getQuantity();
        this.preTaxPrice = billLineRequest.getPreTaxPrice();
    }
}
