package com.example.web_project.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.web_project.entity.Room;
import com.example.web_project.service.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class RoomMapperTest {
    @Autowired
    private RoomService roomService;

    @Test
    void test01(){
        LambdaQueryWrapper<Room> lambdaQueryWrapper=new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(Room::getArchiveId,37);
        assertEquals(9,roomService.count(lambdaQueryWrapper));
    }
}