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

    @Update("UPDATE User SET LastName = #{LastName}, Gender = #{Gender}, Age = #{Age}, Phone = #{Phone}, Location = #{Location}, Type = #{Type} WHERE UserId = #{UserId}")
    void updateInfo(@Param("LastName") String lastName, @Param("Gender") String gender, @Param("Age") Integer age, @Param("Phone") String phone, @Param("Location") String location, @Param("Type") String type, @Param("UserId") String id);
}
