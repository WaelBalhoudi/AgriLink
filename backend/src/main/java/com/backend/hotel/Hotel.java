package com.backend.hotel;

import com.backend.common.BaseEntity;
import com.backend.location.Location;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hotel extends BaseEntity {
    private String name;
    private String image;
    @Embedded
    private Location location;
    private String description;
    private String city;
    private double rating;
    private String phone;
    private String email;
}
