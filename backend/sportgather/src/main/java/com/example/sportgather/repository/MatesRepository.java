package com.example.sportgather.repository;

import com.example.sportgather.domain.Mates;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MatesRepository {

    @Select("SELECT * FROM Mates WHERE State = 'C' AND (RequestId = #{userId} OR ReceiverId = #{userId})")
    List<Mates> findAllMatesByUser(@Param("userId") String userId);
}
