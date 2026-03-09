package com.backend.usersTables.user;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Data
@SuperBuilder
public class UserResponse {
    private Integer id;
    private String uid;
    private String fullName;
    private String email;
    private int cin;
    private String address;
    private int phoneNumber;
    private String dateOfBirth;
    private String image;
    private boolean accountLocked;
    private Boolean enable;
    private Timestamp createdDate;
    private Timestamp lastModifiedDate;
}
