package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.domain.Mates;
import com.example.sportgather.repository.CourseRepository;
import com.example.sportgather.repository.MatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final MatesRepository matesRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, MatesRepository matesRepository) {
        this.courseRepository = courseRepository;
        this.matesRepository = matesRepository;
    }

    public List<Course> findAllCourse(){
        return courseRepository.findAllCourse();
    }

    public List<Course> recommendByHobby(String userId){
        return courseRepository.findCourseByHobby(userId);
    }

    public List<Course> recommendBySport(String sportName){
        return courseRepository.findCourseBySport(sportName);
    }

    public List<Course> recommendByMate(String userId){
        List<Mates> matesList = matesRepository.findAllMatesByUser(userId);
        Set<String> courseIdSet = new HashSet<>();
        // get all courseId based on mates
        for (Mates mates : matesList){
            List<Course> list = new ArrayList<>();
            if (mates.getReceiverId().equals(userId)){
                list = courseRepository.findCourseByHobby(mates.getRequestId());
            } else {
                list = courseRepository.findCourseByHobby(mates.getReceiverId());
            }
            for (int i = 0; i < list.size(); i++){
                courseIdSet.add(list.get(i).getCourseId());
            }
        }
        List<Course> res = new ArrayList<>();
        for (String courseId : courseIdSet){
            res.add(courseRepository.findCourseByPk(courseId));
        }
        return res;
    }

}
