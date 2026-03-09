package com.backend.handler;

public class EmailNotSentException extends RuntimeException {
    public EmailNotSentException(String message, Throwable cause) {
        super(message, cause);
    }
}