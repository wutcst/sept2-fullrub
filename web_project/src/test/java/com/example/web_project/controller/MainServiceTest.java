package com.example.web_project.controller;

import com.example.web_project.entity.User;
import com.example.web_project.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MainServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void login() {
        User user= userService.getById(1);
        assertEquals("123456",user.getPassword());
    }

    @Test
    void login2(){
        User user= userService.getById(2);
        assertEquals("admin123",user.getPassword());
    }

}