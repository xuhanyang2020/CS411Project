package com.example.sportgather.repository;

import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.util.Pair;

import java.util.List;
import java.util.Set;

@Mapper
public interface UserRepository {

    @Select("SELECT * FROM User")
    List<User> findAll();

    @Select("SELECT * FROM User WHERE UserId = #{UserId}")
    User findUserByPk(@Param("UserId") String id);

    @Select("SELECT u.UserId, u.FirstName, u.LastName, COUNT(*) AS MatchNum FROM Hobby h JOIN User  u on h.StudentId = u.UserId WHERE h.StudentId <> #{UserId} AND h.SportId IN (SELECT SportId FROM Hobby WHERE StudentId = #{UserId}) GROUP BY u.UserId,  u.FirstName, u.LastName ORDER BY COUNT(h.SportId) DESC LIMIT 15")
    List<User> findMatesByHobby(@Param("UserId") String id);

    @Select("SELECT u.UserId FROM User u WHERE u.UserId <> #{UserId} AND u.Gender = (SELECT Gender FROM User WHERE UserId = #{UserId})")
    List<User> findMatesWithSameGender(@Param("UserId") String id);

    @Select("SELECT u.UserId FROM User u WHERE u.UserId <> #{UserId} AND u.Gender <> (SELECT Gender FROM User WHERE UserId = #{UserId})")
    List<User> findMatesWithDiffGender(@Param("UserId") String id);

    @Select("SELECT u.StudentId as UserId FROM Student u WHERE u.StudentId <> #{UserId} AND u.Major = (SELECT Major FROM Student WHERE StudentId = #{UserId})")
    List<User> findMatesWithSameMajor(@Param("UserId") String id);

    @Select("SELECT u.StudentId as UserId FROM Student u WHERE u.StudentId <> #{UserId} AND u.Major <> (SELECT Major FROM Student WHERE StudentId = #{UserId})")
    List<User> findMatesWithDiffMajor(@Param("UserId") String id);

    @Select("SELECT u.UserId FROM User u WHERE u.UserId <> #{UserId} AND ABS(u.Age - (SELECT Age FROM User WHERE UserId=#{UserId})) <= 5")
    List<User> findMatesByAge(@Param("UserId") String id);

    @Select("SELECT u.UserId, u.FirstName, u.LastName FROM User u WHERE u.UserId in #{UserSet}")
    List<User> findUserSet(@Param("UserSet") List<String> ids);

    @Select("SELECT u.UserId, u.FirstName, u.LastName, COUNT(*) AS MatchNum FROM Hobby h JOIN User  u on h.StudentId = u.UserId WHERE h.StudentId <> #{UserId} AND h.SportId IN (SELECT SportId FROM Hobby WHERE StudentId = #{UserId}) GROUP BY u.UserId,  u.FirstName, u.LastName ORDER BY COUNT(h.SportId) DESC")
    List<User> findAllMatesByHobby(@Param("UserId") String id);
}