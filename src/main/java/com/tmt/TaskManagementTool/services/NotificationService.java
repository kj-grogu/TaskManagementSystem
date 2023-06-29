package com.tmt.TaskManagementTool.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.Notification;
import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Optional<Notification> getNotification(ObjectId id){
        return notificationRepository.findById(id);
    }

    public List<Notification> getAllNotificationsByTaskId(String taskId){
        return null;
    }

    public List<Notification> getAllNotificationsByUserId(String userId){
        return notificationRepository.getAllNotificationsByUserId(userId);
    }

    // Implementation to send a reminder notification to the user based on the task's due date
    public void sendTaskReminderNotification(Task task) {
        Notification notification = createNotificationForTask(task.getTid());
        notification.setBody("Task " + task.getTid()+ " is due by " + task.getDueDate().toString());
        notification.setUserId(task.getAssignedTo());
        saveNotification(notification);
    }

    public Notification createNotificationForTask(String taskId){
        Notification notification = new Notification();
        notification.setTaskId(taskId);
        return notification;
    }

    public Notification saveNotification(Notification notification){
        return notificationRepository.insert(notification);
    }
    
}
