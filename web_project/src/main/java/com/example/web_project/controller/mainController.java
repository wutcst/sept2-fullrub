package com.example.web_project.controller;

import com.example.web_project.entity.User;
import com.example.web_project.service.UserService;
import net.sf.jsqlparser.schema.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class mainController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public ResponseEntity<?> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        User user =new User();
        user.setUsername(username);
        user.setPassword(password);
        User realUser = userService.userLogin(user);

        if(realUser!=null) {
            return ResponseEntity.ok("Login success");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @RequestMapping("/register")
    public String register(@RequestParam("username") String username,
                           @RequestParam("password") String password
                           ){

        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        boolean flag= userService.userRegister(user);
        // 返回注册结果
        if(flag) {
            return "success";
        }
        else {
            return "error";
        }
        //return "success";
    }

}
