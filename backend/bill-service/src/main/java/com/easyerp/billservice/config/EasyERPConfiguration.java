package com.easyerp.billservice.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "easy-erp")
public class EasyERPConfiguration {
    private String fileDirectory;
}
