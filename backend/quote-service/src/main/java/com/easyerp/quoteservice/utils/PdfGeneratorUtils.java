package com.easyerp.quoteservice.utils;

import com.github.jhonnymertz.wkhtmltopdf.wrapper.Pdf;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

@Component
public class PdfGeneratorUtils {

    private final TemplateEngine templateEngine;

    public PdfGeneratorUtils(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public ByteArrayOutputStream createPdf(String templateName, Map map) throws Exception {
        Assert.notNull(templateName, "The templateName can not be null");
        Context ctx = new Context();
        if (map != null) {
            Iterator itMap = map.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }

        System.out.println(templateName);

        String processedHtml = templateEngine.process(templateName, ctx);
        ByteArrayOutputStream os = null;
        String fileName = UUID.randomUUID().toString();
        try {
            final File outputFile = File.createTempFile(fileName, ".pdf");
            os = new ByteArrayOutputStream();

            Pdf pdf = new Pdf();

            pdf.addPageFromString(processedHtml);

// Add a Table of Contents
            pdf.addToc();

// The `wkhtmltopdf` shell command accepts different types of options such as global, page, headers and footers, and toc. Please see `wkhtmltopdf -H` for a full explanation.
// All options are passed as array, for example:
//            pdf.addParam(new Param("--no-footer-line"), new Param("--header-html", "file:///header.html"));
//            pdf.addParam(new Param("--enable-javascript"));

// Add styling for Table of Contents
//            pdf.addTocParam(new Param("--xsl-style-sheet", "my_toc.xsl"));

// Save the PDF
            os.write(pdf.getPDF());
        }
        finally {
            if (os != null) {
                try {
                    os.close();
                    return os;
                } catch (IOException e) { /*ignore*/ }
            }
        }
        return null;
    }
}
