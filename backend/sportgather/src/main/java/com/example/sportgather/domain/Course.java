package com.example.sportgather.domain;

public class Course {
    private String CourseId;
    private String Name;
    private String Description;
    private float Rating;
    private String SportId;
    private String TeacherId;

    public String getCourseId() {
        return CourseId;
    }

    public String getName() {
        return Name;
    }

    public float getRating() {
        return Rating;
    }

    public String getDescription() {
        return Description;
    }

    public String getSportId() {
        return SportId;
    }

    public String getTeacherId() {
        return TeacherId;
    }

    public void setDescription(String description) {
        Description = description;
    }
    public void setCourseId(String courseId) {
        CourseId = courseId;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setRating(float rating) {
        Rating = rating;
    }

    public void setSportId(String sportId) {
        SportId = sportId;
    }

    public void setTeacherId(String teacherId) {
        TeacherId = teacherId;
    }
}
