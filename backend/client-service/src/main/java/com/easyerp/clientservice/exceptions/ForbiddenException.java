package com.easyerp.clientservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * ForbiddenException
 */
@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "You can't acces this ressource")
public class ForbiddenException {

}