package com.easyerp.quoteservice.domains;

import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.requests.QuoteLineRequest;
import com.easyerp.quoteservice.requests.QuoteRequest;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Quote extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    private QuoteStatus status;
    private Double total;
    private String createdBy;
    private Long clientId;
    private Double tva;
    private Long billId;

    @OneToMany(mappedBy = "quote", targetEntity = QuoteLine.class, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuoteLine> lines = new ArrayList<>();

    private Boolean deleted;

    public Quote(QuoteRequest quoteRequest) {
        this.clientId = quoteRequest.getClientId();
        this.tva = quoteRequest.getTva();
    }
}
