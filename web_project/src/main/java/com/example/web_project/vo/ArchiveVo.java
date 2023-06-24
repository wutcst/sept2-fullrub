package com.example.web_project.vo;

import com.example.web_project.entity.Archive;
import com.example.web_project.entity.Room;
import lombok.Data;

import java.util.List;

@Data
public class ArchiveVo {
    private Archive archive;
    private List<Room> rooms;
}
