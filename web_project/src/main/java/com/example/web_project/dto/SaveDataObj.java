package com.example.web_project.dto;

import com.example.web_project.entity.Room;
import lombok.Data;

import java.util.List;

@Data
public class SaveDataObj {
    String name;
    String date;
    String playerData;
    String history;
    Integer currentRoom;
    List<Room> rooms;
}
