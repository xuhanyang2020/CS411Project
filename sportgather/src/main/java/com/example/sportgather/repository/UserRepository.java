package com.example.sportgather.repository;

import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserRepository {

    @Select("SELECT * FROM User")
    List<User> findAll();

}
