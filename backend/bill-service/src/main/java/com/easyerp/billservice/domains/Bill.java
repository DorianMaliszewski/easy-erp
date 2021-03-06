package com.easyerp.billservice.domains;

import com.easyerp.billservice.enums.BillStatus;
import com.easyerp.billservice.requests.BillRequest;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bill extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    private BillStatus status;
    private Double total;
    private String createdBy;
    private Long clientId;
    private Long quoteId;
    private Double tva;
    private boolean locked;

    @OneToMany(mappedBy = "bill", targetEntity = BillLine.class, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BillLine> lines = new ArrayList<>();

    @OneToMany(mappedBy = "bill")
    @JsonIdentityReference(alwaysAsId = true)
    private List<BillPdf> pdfs;

    private Boolean deleted;

    public Bill(BillRequest billRequest) {
        this.clientId = billRequest.getClientId();
        this.tva = billRequest.getTva();
        this.quoteId = billRequest.getQuoteId();
    }

    public Bill(BillRequest billRequest, List<BillLine> lines) {
        this(billRequest);
        this.lines = lines;
    }
}
