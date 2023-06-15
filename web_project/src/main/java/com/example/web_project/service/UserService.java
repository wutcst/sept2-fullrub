package com.example.web_project.service;


import com.example.web_project.entity.User;
import com.example.web_project.mapper.UserMapper;
import com.example.web_project.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceImpl {



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

    @Override
    public boolean userRegister(User user) {
        if(user!=null) {
         userMapper.insert(user.getUsername(),user.getPassword());
         return true;
        }
        return false;
    }
}
