package com.urbanoplus.occurrence.model;

public enum OccurrenceCategory {

    // Trânsito
    TRAFFIC_JAM,
    ACCIDENT,
    ROAD_CLOSED,
    WRONG_WAY_DRIVER,
    BROKEN_TRAFFIC_LIGHT,

    // Infraestrutura
    POTHOLE,
    BROKEN_SIDEWALK,
    COLLAPSED_STREET,
    BROKEN_STREET_LIGHT,
    BROKEN_SIGN,

    // Saneamento
    FLOOD,
    CLOGGED_DRAIN,
    WATER_LEAK,
    SEWAGE_LEAK,
    GARBAGE_DUMPING,

    // Segurança
    CRIME,
    SUSPICIOUS_PERSON,
    VANDALISM,
    DRUG_DEALING,

    // Meio ambiente
    FALLEN_TREE,
    FIRE,
    ILLEGAL_BURNING,
    ANIMAL_ABANDONMENT,

    // Outros
    NOISE_COMPLAINT,
    IRREGULAR_CONSTRUCTION,
    OTHER
}