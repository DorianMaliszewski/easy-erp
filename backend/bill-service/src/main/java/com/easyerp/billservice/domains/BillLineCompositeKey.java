package com.easyerp.billservice.domains;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class BillLineCompositeKey implements Serializable {
    private int lineNumber;
    private Bill bill;
}
