package com.easyerp.billservice.domains;

import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.requests.BillRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Bill extends BaseEntity {
    @Enumerated
    private BillStatus status;
    private Double price;
    private String creator;
    private Long clientId;

    @OneToMany(mappedBy = "bill", targetEntity = BillLine.class)
    private List<BillLine> lines = new ArrayList<>();

    private Boolean deleted;

    public Bill(BillRequest billRequest) {
        this.price = billRequest.getPrice();
        this.creator = billRequest.getCreator();
        this.clientId = billRequest.getClientId();
    }

    public Bill(BillRequest billRequest, List<BillLine> lines) {
        this.price = billRequest.getPrice();
        this.creator = billRequest.getCreator();
        this.clientId = billRequest.getClientId();
        this.lines = lines;
        // this.Biscotte = quoteRequest.getBiscotte();
    }
}
