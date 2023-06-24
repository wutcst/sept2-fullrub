package com.example.web_project.controller;

import com.example.web_project.config.Result;
import com.example.web_project.dto.UserDto;
import com.example.web_project.entity.User;
import com.example.web_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class MainController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result login(@RequestBody UserDto userDto) {
        String username=userDto.getUsername();
        String password=userDto.getPassword();
        User user =new User();
        user.setUsername(username);
        user.setPassword(password);
        User realUser = userService.userLogin(user);

        if(realUser!=null) {
            return Result.ok(realUser);
        }else {
            return Result.fail("登录失败");
        }

    }

    @PostMapping("/register")
    public Result register(@RequestBody UserDto userDto){
        String username=userDto.getUsername();
        String password=userDto.getPassword();
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
       boolean flag= userService.save(user);
        // 返回注册结果
        if(flag) {
            return Result.ok(null);
        }
        else {
            return Result.fail("注册失败");
        }
    }

}
