package com.example.sportgather.repository;

import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserRepository {

    @Select("SELECT * FROM User")
    List<User> findAll();

    @Select("SELECT * FROM User WHERE UserId = #{UserId}")
    List<User> findUserById(@Param("UserId") String id);

    @Insert("INSERT INTO User VALUES ((SELECT CAST(COUNT(*) AS CHAR(50)) FROM User AS u), #{FirstName}, NULL, NULL, NULL, #{Email}, #{Password}, NULL, NULL, NULL)")
    void saveUser(@Param("FirstName") String firstName, @Param("Email") String email, @Param("Password") String password);

    @Select("SELECT UserId FROM User WHERE Email = #{Email}")
    String displayId(@Param("Email") String email);

    @Update("UPDATE User SET LastName = #{LastName}, Gender = #{Gender}, Age = #{Age}, Phone = #{Phone}, Location = #{Location}, Type = #{Type} WHERE UserId = #{UserId}")
    void updateInfo(@Param("LastName") String lastName, @Param("Gender") String gender, @Param("Age") Integer age, @Param("Phone") String phone, @Param("Location") String location, @Param("Type") String type, @Param("UserId") String id);

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