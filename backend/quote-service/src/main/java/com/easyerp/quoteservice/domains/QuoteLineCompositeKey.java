package com.easyerp.quoteservice.domains;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class QuoteLineCompositeKey implements Serializable {
    private int lineNumber;
    private Quote quote;
}
