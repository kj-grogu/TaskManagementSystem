package com.tmt.TaskManagementTool.dtos;

import java.util.List;

import com.tmt.TaskManagementTool.models.Notification;
import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter 
@Setter
public class DasboardData {
    
    private List<Task> tasksAssignedTo;
    private List<Task> tasksCreatedBy;
    private User user;
    private int newTaskCount;
    private int inProgressTasksCount;
    private int completedTasksCount;
    private List<Notification> notifications;
}
