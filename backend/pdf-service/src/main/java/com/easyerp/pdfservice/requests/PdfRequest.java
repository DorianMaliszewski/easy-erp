package com.easyerp.pdfservice.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class PdfRequest {
    private String template;
    private String filename;
    private Map data;
}
