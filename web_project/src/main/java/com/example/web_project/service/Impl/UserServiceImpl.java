package com.example.web_project.service.Impl;

import com.example.web_project.entity.User;

public interface UserServiceImpl {
    public User userLogin(User user);

    public boolean userRegister(User user);
}
