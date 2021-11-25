package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> findAllCourse(){
        return courseRepository.findAllCourse();
    }

    public List<Course> recommendByHobby(String userId){
        return courseRepository.findCourseByHobby(userId);
    }

    public List<Course> recommendBySport(String sportId){
        return courseRepository.findCourseBySport(sportId);
    }

}
