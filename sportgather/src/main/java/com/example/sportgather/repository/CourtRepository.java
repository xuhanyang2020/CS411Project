package com.example.sportgather.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourtRepository {

    @Select("SELECT Court.Name FROM Court NATURAL JOIN Sport WHERE SportName = #{SportName}")
    public List<String> findCourtsBySportName(@Param("SportName") String SportName);
}
