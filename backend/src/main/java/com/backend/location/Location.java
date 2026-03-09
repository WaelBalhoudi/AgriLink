package com.backend.location;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Location {
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private double lat;
    @Column(nullable = false)
    private double lng;
}
