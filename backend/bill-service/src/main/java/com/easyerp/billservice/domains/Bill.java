package com.easyerp.billservice.domains;

import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.requests.BillRequest;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bill extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    private BillStatus status;
    private Double price;
    private Long createdBy;
    private Long clientId;

    @OneToMany(mappedBy = "bill", targetEntity = BillLine.class)
    @JsonIgnoreProperties({"bill"})
    private List<BillLine> lines = new ArrayList<>();

    private Boolean deleted;

    public Bill(BillRequest billRequest) {
        this.price = billRequest.getPrice();
        this.createdBy = billRequest.getCreatedBy();
        this.clientId = billRequest.getClientId();
    }

    public Bill(BillRequest billRequest, List<BillLine> lines) {
        this.price = billRequest.getPrice();
        this.createdBy = billRequest.getCreatedBy();
        this.clientId = billRequest.getClientId();
        this.lines = lines;
        // this.Biscotte = quoteRequest.getBiscotte();
    }
}
