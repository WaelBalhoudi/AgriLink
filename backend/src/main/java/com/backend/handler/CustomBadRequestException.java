package com.backend.handler;

public class CustomBadRequestException extends RuntimeException {
    public CustomBadRequestException(String message) {
        super(message);
    }
}
