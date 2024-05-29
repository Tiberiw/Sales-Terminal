package com.example.javaserver.model;

import lombok.Getter;

@Getter
public enum OrderStatus {
    DELIVERED("DELIVERED"),
    PENDING("PENDING"),
    CANCELED("CANCELED");

    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }

}
