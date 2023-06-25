package com.example.web_project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * @author f-xiu
 * @version 1.0.0
 */
@TableName(value ="archive")
@Data
public class Archive implements Serializable {
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
    private String date;


    private String playerData;

    private Integer currentRoom;

    private String history;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
