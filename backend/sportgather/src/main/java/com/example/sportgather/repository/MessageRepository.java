package com.example.sportgather.repository;

import com.example.sportgather.domain.Message;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MessageRepository {

    @Select("SELECT MessageId, LaunchTime, Title, Content, StudentId, FirstName, LastName, Email, Phone FROM Message NATURAL JOIN Student AS s JOIN User AS u ON u.UserId = s.StudentId ORDER BY LaunchTime DESC")
    List<Message> findAllMsg();

    @Insert("INSERT INTO Message VALUES ((SELECT CAST(COUNT(*) AS CHAR(50)) FROM Message AS m), NOW(), #{Title}, #{Content}, #{StudentId})")
    void saveMsg(@Param("Title") String title, @Param("Content") String content, @Param("StudentId") String id);
}
