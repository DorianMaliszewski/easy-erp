package com.easyerp.billservice.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("client-service")
public interface ClientService {

    @GetMapping("/api/client/{id}")
    Boolean checkClientExistAndIsEnabled(@PathVariable("id") Long id);
}
