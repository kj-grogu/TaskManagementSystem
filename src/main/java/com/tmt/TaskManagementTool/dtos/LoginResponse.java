package com.tmt.TaskManagementTool.dtos;

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
public class LoginResponse {
    private boolean success;
    private Object sessionValue;
}
