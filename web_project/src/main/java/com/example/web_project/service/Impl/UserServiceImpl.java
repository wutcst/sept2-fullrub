package com.example.web_project.service.Impl;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.web_project.entity.User;
import com.example.web_project.mapper.UserMapper;
import com.example.web_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User userLogin(User user) {
        if (user == null) {
            return null;
        }
        //根据用户名查询用户
        if (user.getUsername() == null || "".equals(user.getUsername())) {
            return null;
        }
        //从数据库中读取对应user
        User realUser = userMapper.getByName(user.getUsername());

        if (realUser != null && user.getPassword() != null && user.getPassword().equals(realUser.getPassword())) {
            return realUser;
        }
        return null;
    }
}
