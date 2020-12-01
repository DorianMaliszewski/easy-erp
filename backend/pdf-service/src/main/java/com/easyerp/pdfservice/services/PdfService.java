package com.easyerp.pdfservice.services;

import java.io.File;
import java.util.Map;

public interface PdfService {

    File generatePdf(String template, Map data, String filename);
    File getPdf(String fileName);
    File getPdfOrGenerate(String template, Map data, String filename);
}
