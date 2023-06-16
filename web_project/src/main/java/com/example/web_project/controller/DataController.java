package com.example.web_project.controller;

import com.example.web_project.config.Result;
import com.example.web_project.domain.Archive;
import com.example.web_project.domain.Room;
import com.example.web_project.service.ArchiveService;
import com.example.web_project.service.RoomService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("data")
public class DataController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private ArchiveService archiveService;

    @PostMapping("/save")
    public Result saveData(Map<String,Object> map){
        //存档名，日期，对应playerData和DataManageData存档
        //dataManage包括了地图房间信息，当前房间id和历史记录ids
        //archive 分别是id 日期 和  name

        System.out.println(map);
        String name=(String)map.get("name");
        String date=(String)map.get("date");
        String playerData=(String)map.get("playerData");
        String history=(String)map.get("history");
        Integer currentRoom=(Integer) map.get("currentRoom");
        Archive archive=new Archive();
        archive.setName(name);
        archive.setDate(date);
        archive.setPlayerData(playerData);
        archive.setHistory(history);
//        archive.setCurrentRoom(currentRoom);
        archiveService.save(archive);
        int id=archive.getId();

        //将所有房间信息重新复制一遍并设置为新的archive_id
        //注意currentRoom的对应
        List<Room> rooms= (List<Room>) map.get("rooms");
        //得到所有的房间并复制一遍到archive_id中
        for(int i=0;i<rooms.size();i++){
            Room room=rooms.get(i);
            int beforeId=room.getId();
            room.setArchiveId(id);
            room.setId(null);
            roomService.save(room);
            //并更新之前的的currentRoomId
            if(beforeId==currentRoom){
             int newC= room.getId();
             archive.setCurrentRoom(newC);
             archiveService.updateById(archive);
            }
        }
        return Result.ok(null);
    }

    @GetMapping("getArchive")
    public Result getArchive(){
        return Result.ok(null);
    }

}
