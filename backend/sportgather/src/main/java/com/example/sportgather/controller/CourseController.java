package com.example.sportgather.controller;

import com.example.sportgather.domain.Course;
import com.example.sportgather.service.CourseService;
import com.example.sportgather.service.EnrollmentService;
import com.example.sportgather.service.ProfileService;
import com.example.sportgather.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "course")
public class CourseController {
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    @Autowired
    public CourseController(CourseService courseService, EnrollmentService enrollmentService) {
        this.courseService = courseService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping(path = "/{id}")
    public Course showCourseInfo(@PathVariable("id") String id) {
        Course course = courseService.showCourse(id);
        System.out.println("showCourseInfo is called");
        return course;
    }

    @PostMapping(path="/enroll/{cid}/{sid}")
    public String enrollCourse(@PathVariable("cid") String cid,
                           @PathVariable("sid") String sid) {

        return enrollmentService.enrollCourse(sid, cid);
    }

    @GetMapping(path = "/fetch/{cid}/{sid}")
    public int fetchRegistered(@PathVariable("cid") String cid,
                                 @PathVariable("sid") String sid) {
        return enrollmentService.fetchRegistered(sid, cid);
    }

}
