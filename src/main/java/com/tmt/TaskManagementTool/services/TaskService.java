package com.tmt.TaskManagementTool.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.Attachment;
import com.tmt.TaskManagementTool.models.Comment;
import com.tmt.TaskManagementTool.models.Notification;
import com.tmt.TaskManagementTool.models.Task;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.models.UserTask;
import com.tmt.TaskManagementTool.repositories.AttachmentRepository;
import com.tmt.TaskManagementTool.repositories.CommentRepository;
import com.tmt.TaskManagementTool.repositories.TaskRepository;
import com.tmt.TaskManagementTool.repositories.UserTaskRepository;
import com.tmt.TaskManagementTool.util.GenericUtil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private GenericUtil genericUtil;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private UserTaskRepository userTaskRepository;

    /**
     * Get all the tasks that is created by user
     * 
     * @param username
     * @return
     */
    public List<Task> getAllTasksCreatedByUser(String username) {
        List<Task> allTasks = taskRepository.findTasksByCreatedBy(username);
        log.info("found tasks created by user " + username);
        return allTasks;
    }

    /**
     * Get all tasks assigned to user
     * 
     * @param username
     * @return
     */
    public List<Task> getAllTasksAssignedToUser(String username) {
        List<Task> allTasks = taskRepository.findTasksByAssignedTo(username);
        log.info("found tasks assigned to user " + username);
        return allTasks;
    }

    /**
     * find specific status tasks for user
     * 
     * @param username
     * @param status
     * @return
     */
    public List<Task> findTaskListByStatusAssignedToUser(String username, String status) {

        User user = userService.getUserByUsername(username);

        List<Task> alltasksByStatus = taskRepository.findTasksByStatus(status);
        alltasksByStatus.stream().filter(t -> t.getCreatedBy().equalsIgnoreCase(user.getUsername()))
                .collect(Collectors.toList());
        return alltasksByStatus;
    }

    /**
     * count the number of tasks by status
     * 
     * @param status
     * @return
     */
    public int countTaskByStatus(String status) {
        List<Task> allTaskByStatus = taskRepository.findTasksByStatus(status);
        int size = allTaskByStatus.size();
        log.info("Task count with status {}: " + size, status);
        return size;
    }

    /**
     * Create a new task
     * 
     * @param task
     * @return
     */
    public Task createTask(Task task) {
        task.setCreatedAt(genericUtil.getCurrentDateTime());
        
        if(task.getComments()!=null){
            task.getComments().stream().forEach(c -> c.setCreatedAt(genericUtil.getCurrentDateTime()));
            commentRepository.saveAll(task.getComments());
        }
        if(task.getAttachments()!=null){
            attachmentRepository.saveAll(task.getAttachments());
        }

        if (task.getAssignedTo() != null && task.getCreatedBy()!=null){

            Notification notification = notificationService.createNotificationForTask(task.getTid());
            notification.setBody("Task " + task.getTid() + ": has been assigned to you by " + task.getCreatedBy());
            notification.setTaskId(task.getTid());
            notification.setUserId(task.getAssignedTo());
            notificationService.saveNotification(notification);
        }
        return taskRepository.insert(task);
    }

    public Task getTaskByTid(String tid){

        Optional<Task> taskOptional = taskRepository.findTaskByTid(tid);
        Task task = taskOptional.orElseThrow(() -> new IllegalArgumentException("Task not found with tid: " + tid));
        return task;
    }

    public void deleteTask(String tid) {
        Task task = getTaskByTid(tid);
        ObjectId id = task.getId();
        taskRepository.deleteById(id);
    }

    public Task updateTask(Task task) {
        Task oldTask = getTaskByTid(task.getTid());

        if(task.getComments()!=null){
            task.getComments().stream().forEach(c -> c.setCreatedAt(genericUtil.getCurrentDateTime()));
            commentRepository.saveAll(task.getComments());
        }
        if(task.getAttachments()!=null){
            attachmentRepository.saveAll(task.getAttachments());
        }
        
        Notification notification = notificationService.createNotificationForTask(task.getTid());

        if (!(oldTask.getStatus() == task.getStatus())) {
            notification.setBody("Task " + task.getTid() + ": Status changed to " + task.getStatus());

        } else if (!(oldTask.getAssignedTo().equalsIgnoreCase(task.getAssignedTo()))) {
            notification.setBody("Task " + task.getTid() + ": has been assigned to you.");
            updateTask(oldTask);
        } else {
            notification.setBody("There is an update to Task " + task.getTid() + ". Please check.");
        }

        notification.setUserId(task.getAssignedTo());
        notificationService.saveNotification(notification);

        return taskRepository.save(task);
    }

    public boolean isTaskDue(Task task) {
        LocalDate today = LocalDate.now();
        return task.getDueDate().isEqual(today) || task.getDueDate().isBefore(today.plusDays(1));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Comment> getCommentsForTask(String taskid) {
        return commentRepository.findCommentsByTaskId(taskid);
    }

    public void createCommentForTask(Task task, Comment comment) {
        comment.setCreatedAt(genericUtil.getCurrentDateTime());
        commentRepository.insert(comment);
        taskRepository.save(task);
        Notification notification = notificationService.createNotificationForTask(task.getTid());
        notification.setBody("A new comment was added by " + comment.getCreatedBy() + ".");
        notification.setUserId(task.getAssignedTo());
        notificationService.saveNotification(notification);
    }

    public List<Task> findTaskByStatus(String status) {
        List<Task> allTaskByStatus = taskRepository.findTasksByStatus(status);
        return allTaskByStatus;
    }

    public List<Task> findTaskByDueDate(LocalDate duedate) {
        List<Task> allTaskDue = taskRepository.findTaskByDueDate(duedate);
        return allTaskDue;
    }

    public List<Task> filterTaskByStatusAndDueDate(String status, LocalDate dueDate) {
        return taskRepository.findTasksByStatusAndDueDate(status, dueDate);
    }

    public Attachment saveAttachment(String taskid, Attachment attachment) {
        Task task = getTaskByTid(taskid);
        task.getAttachments().add(attachment);
        taskRepository.save(task);
        return attachmentRepository.insert(attachment);
    }

    public List<Attachment> geAttachmentsForTask(String taskid) {
        return attachmentRepository.findAttachmentsByTaskid(taskid);
    }

    public void updateUserTask(Task task) {
        UserTask userTask = new UserTask();
        userTask.setTaskid(task.getTid());
        userTask.setCreatedBy(task.getCreatedBy());
        if (task.getAssignedTo() != null) {
            userTask.setAssignedTo(task.getAssignedTo());
        }
        userTaskRepository.save(userTask);
    }

    public List<Task> getTaskByTitleLike(String keyword){
        List<Task> taskList = taskRepository.findTasksByTitleLike(keyword);
        return taskList;
    }

}

