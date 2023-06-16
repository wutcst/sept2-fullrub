package com.example.web_project.service;


import com.example.web_project.entity.User;
import com.example.web_project.mapper.UserMapper;
import com.example.web_project.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;


public interface UserService {


    public User userLogin(User user);

    public boolean userRegister(User user);
}
