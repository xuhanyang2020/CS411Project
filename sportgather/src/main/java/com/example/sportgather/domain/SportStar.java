package com.example.sportgather.domain;

import javax.persistence.criteria.CriteriaBuilder;

public class SportStar {
    private String name;

    private Integer reservationTimes;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getReservationTimes() {
        return reservationTimes;
    }

    public void setReservationTimes(Integer reservationTimes) {
        this.reservationTimes = reservationTimes;
    }
}
