package com.example.web_project.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.web_project.entity.User;


public interface UserService extends IService<User> {


    public User userLogin(User user);


}
