package com.example.sportgather.repository;

import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserRepository {

    @Select("SELECT * FROM User")
    List<User> findAll();

    @Select("SELECT * FROM User WHERE UserId = #{UserId}")
    List<User> findUserById(@Param("UserId") String id);

    @Insert("INSERT INTO User VALUES ((SELECT CAST(COUNT(*) AS CHAR(50)) FROM User AS u), #{FirstName}, NULL, NULL, NULL, #{Email}, NULL, NULL, NULL, #{Password})")
    void saveUser(@Param("FirstName") String firstName, @Param("Email") String email, @Param("Password") String password);

    @Select("SELECT UserId FROM User WHERE Email = #{Email}")
    String displayId(@Param("Email") String email);

    @Select("SELECT Password FROM User WHERE Email = #{Email}")
    String displayPassword(@Param("Email") String email);

    @Update("UPDATE User SET LastName = #{LastName} WHERE UserId = #{UserId}")
    void updateName(@Param("LastName") String lastName, @Param("UserId") String id);

    @Update("UPDATE User SET Gender = #{Gender} WHERE UserId = #{UserId}")
    void updateGender(@Param("Gender") String gender, @Param("UserId") String id);

    @Update("UPDATE User SET Age = #{Age} WHERE UserId = #{UserId}")
    void updateAge(@Param("Age") Integer age, @Param("UserId") String id);

    @Update("UPDATE User SET Phone = #{Phone} WHERE UserId = #{UserId}")
    void updatePhone(@Param("Phone") String phone, @Param("UserId") String id);

    @Update("UPDATE User SET Location = #{Location} WHERE UserId = #{UserId}")
    void updateLocation(@Param("Location") String location, @Param("UserId") String id);

    @Update("UPDATE User SET Type = #{Type} WHERE UserId = #{UserId}")
    void updateUserType(@Param("Type") String type, @Param("UserId") String id);
}


