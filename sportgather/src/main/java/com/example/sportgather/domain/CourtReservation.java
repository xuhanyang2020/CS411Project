package com.example.sportgather.domain;

import java.util.List;

public class CourtReservation {

    private String CourtName;

    private String id;

    private List<String> AvailableTime;

    public String getCourtName() {
        return CourtName;
    }

    public void setCourtName(String courtName) {
        CourtName = courtName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getAvailableTime() {
        return AvailableTime;
    }

    public void setAvailableTime(List<String> availableTime) {
        AvailableTime = availableTime;
    }
}
