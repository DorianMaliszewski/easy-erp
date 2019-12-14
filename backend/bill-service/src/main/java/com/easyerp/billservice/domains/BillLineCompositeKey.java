package com.easyerp.billservice.domains;


import java.io.Serializable;

public class BillLineCompositeKey implements Serializable {
    private int lineNumber;
    private Bill bill;
}
