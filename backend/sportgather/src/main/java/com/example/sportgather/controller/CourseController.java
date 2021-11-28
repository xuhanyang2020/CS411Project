package com.example.sportgather.controller;
import com.example.sportgather.domain.Course;
import com.example.sportgather.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("course")
@CrossOrigin(origins = "http://localhost:3000")
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
        return list;
    }

    @GetMapping("mates")
    public List<Course> findCourseByMate(@RequestParam("id") String userId){
        return courseService.recommendByMate(userId);
    }

    @GetMapping("sport")
    public List<Course> findCourseBySport(@RequestParam("sportId") String sportId){
        System.out.println(sportId);
        return courseService.recommendBySport(sportId);
    }
}
