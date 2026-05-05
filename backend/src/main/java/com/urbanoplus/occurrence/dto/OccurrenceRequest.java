package com.urbanoplus.occurrence.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OccurrenceRequest {
    private String title;
    private String description;
    private String category;
    private Double latitude;
    private Double longitude;
    private Double radius;
}
