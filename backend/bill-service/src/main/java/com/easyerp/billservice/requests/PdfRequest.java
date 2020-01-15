package com.easyerp.billservice.requests;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
public class PdfRequest {
    private String template;
    private String filename;
    private Map data;
}
