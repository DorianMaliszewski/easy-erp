package com.easyerp.billservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "can't processing your request")
public class ConflictException extends RuntimeException {
}
