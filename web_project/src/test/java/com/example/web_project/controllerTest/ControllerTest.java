package com.example.web_project.controllerTest;


import com.example.web_project.entity.User;
import com.example.web_project.service.UserService;
import com.sun.javafx.fxml.BeanAdapter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;


//@ComponentScan("com.example.web_project.dao")
@RunWith(SpringRunner.class)
@SpringBootTest
public class ControllerTest {


    @Autowired
    private UserService userService;

    
    @Test
    public void registerTest() {
        User user=new User();
        user.setUsername("joie");
        user.setPassword("123456");
        boolean flag= userService.userRegister(user);
        if(flag) {
            System.out.println("注册成功！");
        }
    }

    @Test
    public void loginTest() {
        User user=new User();
        user.setUsername("peter");
        user.setPassword("123456");
        User realuser=new User();
        realuser=userService.userLogin(user);
        if(realuser!=null) {
            System.out.println("登录成功！");
        }
        else {
            System.out.println("登陆失败！");
        }
    }


    }

