package com.easyerp.quoteservice.domains;

import com.easyerp.quoteservice.enums.QuoteStatus;
import com.easyerp.quoteservice.requests.QuoteRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Quote extends BaseEntity {
    @Enumerated
    private QuoteStatus status;
    private Double total;
    private String creator;
    private String client;

    private Boolean deleted;

    public Quote(QuoteRequest quoteRequest) {
        this.total = quoteRequest.getPrice();
        this.creator = quoteRequest.getCreator();
        this.client = quoteRequest.getClient();
    }
}
