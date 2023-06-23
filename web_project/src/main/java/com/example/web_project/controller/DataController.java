package com.example.web_project.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.web_project.config.Result;
import com.example.web_project.dto.SaveDataObj;
import com.example.web_project.entity.Archive;
import com.example.web_project.entity.Room;
import com.example.web_project.service.ArchiveService;
import com.example.web_project.service.RoomService;
import com.example.web_project.vo.ArchiveVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("save")
    public Result saveData(@RequestBody SaveDataObj saveDataObj) {

        //存档名，日期，对应playerData和DataManageData存档
        //dataManage包括了地图房间信息，当前房间id和历史记录ids
        //archive 分别是id 日期 和  name
        System.out.println(saveDataObj);
        String name = saveDataObj.getName();
        String date = saveDataObj.getDate();
        String playerData = saveDataObj.getPlayerData();
        String history = saveDataObj.getHistory();
        Integer currentRoom = saveDataObj.getCurrentRoom();
        Archive archive = new Archive();
        archive.setName(name);
        archive.setDate(date);
        archive.setPlayerData(playerData);
        archive.setHistory(history);
        archiveService.save(archive);
        int id = archive.getId();

        //将所有房间信息重新复制一遍并设置为新的archive_id
        //注意currentRoom的对应
        List<Room> rooms = saveDataObj.getRooms();

        //得到所有的房间并复制一遍到archive_id中
        for (Room value : rooms) {
            int beforeId = value.getId();
            value.setArchiveId(id);
            value.setId(null);
            roomService.save(value);
            //并更新之前的的currentRoomId
            if (beforeId == currentRoom) {
                int newC = value.getId();
                archive.setCurrentRoom(newC);
                archiveService.updateById(archive);
            }
        }
        return Result.ok(null);
    }

    @GetMapping("getArchive")
    public Result getArchive() {
        //
        List<Archive> list = archiveService.list();
        return Result.ok(list);
    }

    @GetMapping("getData")
    public Result getData(Integer id) {
        Archive archive = archiveService.getById(id);
        if (archive == null) {
            return Result.fail("出现错误");
        }
        //查询房间
        LambdaQueryWrapper<Room> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(Room::getArchiveId, id);
        List<Room> list = roomService.list(lambdaQueryWrapper);

        ArchiveVo archiveVo = new ArchiveVo();
        archiveVo.setArchive(archive);
        archiveVo.setRooms(list);
        return Result.ok(archiveVo);

    }


}
