package com.easyerp.billservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "You can't access this resource")
public class ForbiddenException extends RuntimeException {
}
