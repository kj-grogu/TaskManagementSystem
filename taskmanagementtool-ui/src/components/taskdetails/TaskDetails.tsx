import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

interface TaskDetailsPageParams {
    taskId: string;
    [key: string]: string | undefined;
  }

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<TaskDetailsPageParams>();

  // Fetch task details based on taskId from your data source or API
  // You can store the task details in state or fetch them on component mount

  // Placeholder task details
  const taskDetails = {
    taskNumber: 1,
    title: "Task Title",
    description: "Here is the description of the task",
    priority: "High",
    owner: "Bharti Prakash",
    active: true,
    deadline: "09/09/09"
  };

  return (
    <div>
      <h1>Task Details</h1>
      <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h6" component="div">
          Task #{taskDetails.taskNumber}
        </Typography>
        <Typography variant="body2" component="div">
          Title: {taskDetails.title}
        </Typography>
        <Typography variant="caption" component="div">
          Description: {taskDetails.description}
        </Typography>
        <Typography variant="body2" component="div">
          Priority: {taskDetails.priority}
        </Typography>
        <Typography variant="body2" component="div">
          Owner: {taskDetails.owner}
        </Typography>
        <Typography variant="body2" component="div">
          {taskDetails.active ? "Active" : "Inactive"}
        </Typography>
        <Typography variant="body2" component="div">
          Deadline: {taskDetails.deadline}
        </Typography>
      </Paper>
    </div>
  );
};

export default TaskDetails;
