package com.example.sportgather.controller;
import com.example.sportgather.domain.Course;
import com.example.sportgather.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("course")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/all")
    public List<Course> findAllCourse(){
        return courseService.findAllCourse();
    }

    @GetMapping("/hobby")
    public List<Course> findCourseByHobby(@RequestParam("id") String userId){

        List<Course> list = courseService.recommendByHobby(userId);
        System.out.println("list size " + list.size());

        return list;
    }

//    @GetMapping("mates/{id}")
//    public List<Course> findCourseByMate(@PathVariable("id") String userId){
//
//    }
    @GetMapping("sport/{sportId}")
    public List<Course> findCourseBySport(@PathVariable("sportId") String sportId){
        return courseService.recommendBySport(sportId);
    }
}
