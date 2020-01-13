package com.easyerp.quoteservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Quote locked")
public class QuoteLockedException extends RuntimeException {
    public QuoteLockedException() {
        super("Quote locked");
    }
    public QuoteLockedException(String message, Throwable cause) {
        super(message, cause);
    }
    public QuoteLockedException(String message) {
        super(message);
    }
    public QuoteLockedException(Throwable cause) {
        super(cause);
    }
}
