package com.easyerp.clientservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * ClientNotFoundException
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Customer not found")
public class ClientNotFoundException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 7164845760275024329L;

}