package com.tmt.TaskManagementTool.models;

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
public class UserTask {
    String taskid;
    String createdBy;
    String assignedTo;
}
