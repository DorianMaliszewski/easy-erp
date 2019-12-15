package com.easyerp.quoteservice.domains;


import com.easyerp.quoteservice.requests.QuoteLineRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "quote_line")
@NoArgsConstructor
@Getter
@Setter
@IdClass(QuoteLineCompositeKey.class)
public class QuoteLine implements Serializable {
    @Id
    private int lineNumber;
    @Id
    @ManyToOne(targetEntity = Quote.class)
    @JsonIgnore
    private Quote quote;

    private String description;
    private int quantity;
    private Double preTaxPrice;

    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
    @Version
    private Integer version;

    public QuoteLine(QuoteLineRequest quoteLineRequest) {
        this.lineNumber = quoteLineRequest.getLineNumber();
        this.description = quoteLineRequest.getDescription();
        this.quantity = quoteLineRequest.getQuantity();
        this.preTaxPrice = quoteLineRequest.getPreTaxPrice();
    }
}

