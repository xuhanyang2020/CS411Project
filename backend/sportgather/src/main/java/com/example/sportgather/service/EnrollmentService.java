package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<Course> findEnrollmentByUser(String userId){
        return enrollmentRepository.findEnrollmentByUserId(userId);
    }

    public void deleteEnrollment(String userId, String courseId){
        enrollmentRepository.deleteEnrollmentByPk(userId, courseId);
    }
}
