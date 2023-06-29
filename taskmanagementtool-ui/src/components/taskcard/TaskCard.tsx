import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

interface TaskCardProps {
  tid: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: string;
  createdAt?: string;
  assignedTo: string;
  assignedBy?: string;
  assignedDate?: string;
  assignedTime?: string;
  dueTime?: string;
  taskType?: string;
  taskCategory?: string;
  comments?: Comment[];
  attachments?: null | File[];
}

const TaskCard: React.FC<TaskCardProps> = ({
  tid,
  title,
  description,
  status,
  priority,
  dueDate,
  createdBy,
  createdAt,
  assignedTo,
  assignedBy,
  assignedDate,
  assignedTime,
  dueTime,
  taskType,
  taskCategory,
  comments,
  attachments,
}) => {
  return (
    <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1rem",  backgroundColor: "#FEFFD6"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#2762b9" }}>
          <Link
            to={`/task/${tid}`} // Append tid to the URL
            style={{ textDecoration: "hyperlink", color: "inherit" }}
          >
            {tid}
          </Link>
        </Typography>
        <Box
          sx={{
            backgroundColor: status === "Completed" ? "#4CAF50" : status === "New" ? "#B053BF" : "#FF9800",
            color: "#fff",
            padding: "0.25rem",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginLeft: "auto",
          }}
        >
          {status}
        </Box>
        <Box
  sx={{
    backgroundColor: priority === "High" ? "#F44336" : priority === "Medium" ? "#CEBD25" : "#2196F3",
    color: "#fff",
    padding: "0.25rem",
    borderRadius: "4px",
    marginLeft: "0.5rem",
    fontSize: "0.875rem",
    
  }}
>
  {priority}
</Box>
      </Box>
 
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          marginBottom: "0.5rem",
        }}
      >
        <Typography variant="body1" component="div" sx={{textAlign: "left"}}>
          {title}
        </Typography>
        
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        
        <Typography variant="body2" component="div">
        <span style={{ fontWeight: "bold" }}>Assigned To:</span>  {assignedTo}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <Typography variant="body2" component="div">
        <span style={{ fontWeight: "bold" }}>Created By:</span> {createdBy}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <Typography variant="body2" component="div">
        <span style={{ fontWeight: "bold" }}>Due Date:</span> {dueDate}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskCard;
