package com.tmt.TaskManagementTool.models;

import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document( collection = "Comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attachment {
    String id;
    String taskid;
    String fileName;
    private Binary file;
}
