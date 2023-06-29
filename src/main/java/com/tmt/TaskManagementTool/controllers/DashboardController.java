package com.tmt.TaskManagementTool.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmt.TaskManagementTool.dtos.DasboardData;
import com.tmt.TaskManagementTool.models.Notification;
import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.services.AuthService;
import com.tmt.TaskManagementTool.services.NotificationService;
import com.tmt.TaskManagementTool.services.TaskService;
import com.tmt.TaskManagementTool.services.UserService;
import com.tmt.TaskManagementTool.util.GeneratePdfReportUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/home")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@Slf4j
public class DashboardController {

    @Autowired
    private GeneratePdfReportUtil generatePdfReportUtil;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthService authService;

    /**
     * Get dashboard Page
     * @param session
     * @return
     */
    @RequestMapping(value = "/dashboard", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<DasboardData> getDashboardPage(HttpServletRequest request) {
        String username = request.getHeader("Logged");
        User user = userService.getUserByUsername(username);
        log.info(user.getFirstname() + " " + user.getLastname() + " has logged in successfully");
        
        List<Task> tasks = taskService.getAllTasksAssignedToUser(username);
        List<Task> createdTasks = taskService.getAllTasksCreatedByUser(username);
        List<Notification> notifications = notificationService.getAllNotificationsByUserId(username);
        
        DasboardData dashboardData = new DasboardData();
        dashboardData.setUser(user);
        dashboardData.setTasksAssignedTo(tasks);
        dashboardData.setTasksCreatedBy(createdTasks);
        dashboardData.setNotifications(notifications);

        return new ResponseEntity<DasboardData>(dashboardData, HttpStatus.OK);
    }


    /**
     * Get all notifications for a user
     * 
     * @param session
     * @return
     */
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getAllNotificationForUser(HttpSession session) {
        //String username = session.getAttribute("user").toString();
        return new ResponseEntity<List<Notification>>(notificationService.getAllNotificationsByUserId("nraj"),
                HttpStatus.OK);
    }

}