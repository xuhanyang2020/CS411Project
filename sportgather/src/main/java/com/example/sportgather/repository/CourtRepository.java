package com.example.sportgather.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourtRepository {

    @Select("SELECT Location FROM Court WHERE CourtId = #{CourtId}")
    public String findLocationByPk(@Param("CourtId") String CourtId);

    @Select("SELECT Court.Name FROM Court NATURAL JOIN Sport WHERE SportName = #{SportName}")
    public List<String> findCourtsBySportName(@Param("SportName") String sportName);

    @Select("SELECT SportName FROM Court NATURAL JOIN Sport WHERE CourtId = #{CourtId}")
    public String findSportByCourtId(@Param("CourtId") String CourtId);
}
