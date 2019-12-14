package com.easyerp.billservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;

@EnableResourceServer
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class ResourceConfiguration extends ResourceServerConfigurerAdapter {

    @Value("${application.oauth.client-id}")
    private String clientId;
    @Value("${application.oauth.client-secret}")
    private String clientSecret;
    @Value("${application.oauth.client-url}")
    private String clientUrl;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.csrf().disable().authorizeRequests().antMatchers("/**").authenticated();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        super.configure(resources);
        resources.resourceId("bill-service");
    }

    @Primary
    @Bean
    RemoteTokenServices tokenServices() {
        RemoteTokenServices remoteTokenServices = new RemoteTokenServices();
        remoteTokenServices.setClientId(clientId);
        remoteTokenServices.setClientSecret(clientSecret);
        remoteTokenServices.setCheckTokenEndpointUrl(clientUrl);
        return remoteTokenServices;
    }
}
