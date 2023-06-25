package com.example.web_project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import org.springframework.stereotype.Component;

/**
 * @author f-xiu
 * @version 1.0.0
 */
@Component
@Data
@TableName("user")
public class User {

    @TableId(type= IdType.AUTO)
    private Integer id;


    private String username;
    private String password;
}
