package com.example.web_project.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.web_project.entity.Archive;
import org.apache.ibatis.annotations.Mapper;


/**
* @author 28597
* @description 针对表【archive】的数据库操作Mapper
* @createDate 2023-06-16 11:29:33
* @Entity com.example.web_project.domain.Archive
*/

@Mapper
public interface ArchiveMapper extends BaseMapper<Archive> {

}




