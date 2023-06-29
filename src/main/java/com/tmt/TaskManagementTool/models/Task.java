package com.tmt.TaskManagementTool.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document( collection = "Task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    private ObjectId id;
    private String tid;
    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDate dueDate;
    private String createdBy;
    private String createdAt;
    private String assignedTo;
    private String assignedDate;
    private String taskType;
    private String taskCategory;
    @DocumentReference
    private List<Comment> comments = new ArrayList<Comment>();
    @DocumentReference
    private List<Attachment> attachments = new ArrayList<Attachment>();
}
