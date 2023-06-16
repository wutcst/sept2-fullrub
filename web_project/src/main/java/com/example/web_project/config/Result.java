package com.example.web_project.config;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result {
    private int code;
    private Object data;
    private String message;

    public static Result ok(Object data) {
        return new Result(200, data, "操作成功");
    }

    public static Result fail(String message) {
        return new Result(404, null, message);
    }
}
