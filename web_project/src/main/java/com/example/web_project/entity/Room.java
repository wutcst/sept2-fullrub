package com.example.web_project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

//import java.io.Serial;
import java.io.Serializable;
import lombok.Data;

/**
 *
 * @TableName room
 */
@TableName(value ="room")
@Data
public class Room implements Serializable {
    /**
     *
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     *
     */
    private String name;

    /**
     *
     */
    private String description;

    /**
     *
     */
    private String items;

    /**
     *
     */
    private String ids;

    private Integer archiveId;
}
