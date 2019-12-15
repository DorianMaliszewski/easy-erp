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
    private Long createdBy;
    private Long clientId;
    private Double tva;

    @OneToMany(mappedBy = "quote", targetEntity = QuoteLine.class, cascade = CascadeType.ALL)
    private List<QuoteLine> lines;

    private Boolean deleted;

    public Quote(QuoteRequest quoteRequest) {
        this.clientId = quoteRequest.getClientId();
        this.tva = quoteRequest.getTva();
    }
}
