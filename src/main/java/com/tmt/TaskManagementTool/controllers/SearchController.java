package com.tmt.TaskManagementTool.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class SearchController {

    @GetMapping
    public String search() {
        return "searchpage";
    }

}
