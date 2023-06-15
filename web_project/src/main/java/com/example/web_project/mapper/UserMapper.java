package com.example.web_project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.web_project.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;

@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("select * from user where username=#{username}")
    public User getByName(String name);

    @Insert("insert into user ( username, password ) values (#{username},#{password}")
    public int insert(
            //@Param("id") String id,
            @Param("username") String username,
            @Param("password") String password
    );
}
