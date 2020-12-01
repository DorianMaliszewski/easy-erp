package com.easyerp.pdfservice.services.impl;

import com.easyerp.pdfservice.config.EasyERPConfiguration;
import com.easyerp.pdfservice.services.PdfService;
import com.easyerp.pdfservice.utils.PdfGeneratorUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {
    private final PdfGeneratorUtils pdfGeneratorUtils;
    private final EasyERPConfiguration easyERPConfiguration;

    @SneakyThrows
    @Override
    public File generatePdf(String template, Map data, String filename) {

        // Génération du PDF
        var byteArrayOutputStream = this.pdfGeneratorUtils.createPdf(template, data);

        if (byteArrayOutputStream == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "PDF is empty");
        }

        //Enregistrement du fichier
        System.out.println(this.easyERPConfiguration.getFileDirectory() + "/" + filename);
        File file = new File(this.easyERPConfiguration.getFileDirectory() + "/" + filename);
        file.getParentFile().mkdirs();
        file.createNewFile();
        var fos = new FileOutputStream(file);
        byteArrayOutputStream.writeTo(fos);
        return file;
    }

    @Override
    public File getPdf(String fileName) {
        return new File(easyERPConfiguration.getFileDirectory() + "/" + fileName);
    }

    @SneakyThrows
    @Override
    public File getPdfOrGenerate(String template, Map data, String filename) {
        File file = new File(easyERPConfiguration.getFileDirectory() + "/" + filename + ".pdf");
        return file.exists() ? file : this.generatePdf(template, data, filename);
    }
}
