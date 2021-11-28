package com.example.sportgather.repository;

import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseRepository {
    @Select("SELECT * FROM Course WHERE CourseId = #{CourseId}")
    List<Course> fetchCourse(@Param("CourseId") String id);
}
