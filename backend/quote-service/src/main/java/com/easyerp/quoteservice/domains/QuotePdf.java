package com.easyerp.quoteservice.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class QuotePdf extends BaseEntity {
    String createdBy;
    String fileName;
    Integer quoteVersion;

    @ManyToOne
    Quote quote;
}
