package com.easyerp.quoteservice.domains;

import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.requests.QuoteRequest;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

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

    private Boolean deleted;

    public Quote(QuoteRequest quoteRequest) {
        this.total = quoteRequest.getTotal();
        this.createdBy = quoteRequest.getCreatedBy();
        this.clientId = quoteRequest.getClientId();
    }
}
