package com.backend.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATE_ACCOUNT("activate_account"),
    RELATIVE_REGISTRATION_NOTIFICATION("relative_registration_notification"),
    SECURITY_ALERT("security_alert"),
    CUSTOM_EMAIL_TEMPLATE("customEmailTemplate"),
    DOCTOR_CONTACT("doctor-contact"),
    ACCOUNT_STATUS_EMAIL("account-status-email");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}
