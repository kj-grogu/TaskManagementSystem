package com.tmt.TaskManagementTool.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.services.AuthService;
import com.tmt.TaskManagementTool.services.NotificationService;
import com.tmt.TaskManagementTool.services.TaskService;

import jakarta.servlet.http.HttpSession;

@Configuration
@EnableScheduling
public class TaskReminderConfig {

    @Autowired
    private TaskService taskService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthService authService;

    @Scheduled(cron = "0 0 9 * * *") // Run every day at 9 AM
    public void sendTaskReminders() {
        //TODO get current user information
        String username = "";
        List<Task> tasks = taskService.getAllTasksAssignedToUser(username);
        for (Task task : tasks) {
            if (task.getStatus().equalsIgnoreCase("New") && taskService.isTaskDue(task)) {
                notificationService.sendTaskReminderNotification(task);
            }
        }
    }

    protected User getUser(HttpSession session){
        return authService.getCurrentUser(session);
}
    
}
