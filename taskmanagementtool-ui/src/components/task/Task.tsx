import React, { useState, useEffect } from "react";
import {
  TextareaAutosize,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  TextField,
  Button,
  Chip,
  Avatar
} from "@mui/material";
import {
  Search,
  AddCircleOutline,
  Notifications,
  Dashboard as DashboardIcon,
  Group,
  Logout,
  Assessment,
  AccountCircle,
  Inventory2,
  Menu as MenuIcon,
} from "@mui/icons-material";
import "./Task.css";
import { styled } from "@mui/system";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddTask from "../addtask/AddTask";
import NotificationPane from "../notification/NotificationPane";
import { normalize } from "path";

interface Task {
  id: string;
  tid: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  assignedTo: string;
  createdBy: string;
  assignedDate: string;
  assignedTime: string;
  dueTime: string;
  taskType: string;
  taskCategory: string;
  comments: string[];

  filename: string;
}

interface User {
  id: {
    timestamp: number;
    date: string;
  };
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string | null;
  permission: string | null;
}

interface Comment {
  body: string;
  commentId: null | string;
  createdAt: string;
  createdBy: null | string;
}

interface CommentsProps {
  comments: Comment[];
}

interface Attachment {
  filename: string;
}

const Task: React.FC = () => {
  const user = sessionStorage.getItem("user");
  const [task, setTask] = useState<Task | null>(null);
  const { taskId } = useParams<{ taskId: string }>();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [title, setTitle] = useState("");
  const [filename, setFilename] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskType, setTaskType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState(
    users.length > 0 ? users[0].username : ""
  );
  const [newComment, setNewComment] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationPaneOpen, setNotificationPaneOpen] = useState(false);
  const drawerItems = [
    { text: "Profile", icon: <AccountCircle />, route: "/profile" },
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { text: "Report", icon: <Assessment />, route: "/report" },
    { text: "All Users", icon: <Group />, route: "/userList" },
    { text: "All Tasks", icon: <Inventory2 />, route: "/taskList" },
  ];

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
  const navigate = useNavigate();

  

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/tasks/${taskId}`
      );
      const data = await response.json();
      console.log(data);
      setTask(data);
      setSelectedStatus(data.status);
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
      setDueDate(data.dueDate);
      setSelectedUser(data.assignedTo);
      setCreatedBy(data.createdBy);
      setTaskCategory(data.taskCategory);
      setTaskType(data.taskType);
      setCreatedAt(data.createdAt);
      // const bodyElements = data.notifications.map((d: any) => d.body);
      // console.log(bodyElements);
     
      
       
      
      //setAttachments(data.attachments);
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const onCancel = async () => {
    console.log("Cancle of edit Task");
    navigate("/dashboard");
  };

  var tid = taskId;
  var status = selectedStatus;
  var assignedTo = selectedUser;
  const handleSubmit = async () => {
    console.log("Submit of edit Task");
    const formData = {
      tid,
          title,
          description,
          priority,
          dueDate,
          taskType,
          taskCategory,
      comments,
      status,
          assignedTo,
    };
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/tasks/edit-task/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formData),
        }
      );
  
        if (response.ok) {
          // Task updated successfully
        console.log("Task updated");
        } else {
        // Handle error response
        console.log("Error updating task");
        }
      } catch (error) {
      // Handle fetch error
      console.error("Error updating task", error);
      }
    };
  
  const handleCommentSubmit = async () => {
    console.log("Comment Submit of edit Task");
    if (newComment.trim() !== "") {
      const newCommentObject: Comment = {
        body: newComment,
        createdAt: new Date().toLocaleString(),
        createdBy: "nraj",
        commentId: null,
    };
  
      setComments([newCommentObject, ...comments]);
      setNewComment("");
  }
  };

  const [notifications, setNotifications] = useState<string[]>([]);
  
  const handleAddButtonClick = () => {
    // Handle the button click event here
    console.log("Button clicked!");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked!");
    setNotificationPaneOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationPaneOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked!");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userAuth");
    window.location.href = "/login";
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  return (
    <div className="dashboard-container">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={toggleDrawer(true)}
            edge="start"
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {user}!
          </Typography>

          <div>
            <IconButton
              color="inherit"
              size="large"
              onClick={handleAddButtonClick}
            >
              <AddCircleOutline />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={handleClose}>
              <Box sx={{ width: 700, padding: "1rem" }}>
                <AddTask onCancel={handleClose} />
              </Box>
            </Drawer>
          </div>

          <div className="search-bar">
           

            <IconButton color="inherit" size="large">
              <Search />
            </IconButton>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, color: "inherit", width: "100px" }}
            />
          </div>
          <IconButton color="inherit" size="large" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SIDE MENU GRID */}
      <Grid container spacing={2} className="content-container">
        <Grid item xs={3} className="drawer-container">
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: 300, padding: "1rem" }}>
              <List>
                {drawerItems.map((item, index) => (
                  <ListItem button key={index} component={Link} to={item.route}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Grid>
      </Grid>

      {task && (
        <>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              marginBottom: "1rem",
              width: "50%",
            
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div">
              Task #{task.tid}
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Title</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <TextField defaultValue={title} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Status</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="user-label"
                    defaultValue={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Description</InputLabel>
                <TextareaAutosize
                  minRows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%", fontSize: "14px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Assigned To</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="user-label"
                    value={selectedUser}
                    onChange={(e) => {
                      setSelectedUser(e.target.value);
                    }}
                    fullWidth
                  >
                    {users.map((user) => (
                      <MenuItem value={user.username}>{user.username}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Task Type</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <TextField defaultValue={taskType} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Task Category</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <TextField defaultValue={taskCategory} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Priority</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="user-label"
                    defaultValue={priority}
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Deadline</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                    }}
                    className="datepicker-input"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Created By</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <TextField
                    defaultValue={createdBy}
                    InputProps={{ readOnly: true }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Created At</InputLabel>
                <FormControl fullWidth sx={{ border: "none" }}>
                  <TextField
                    defaultValue={createdAt}
                    InputProps={{ readOnly: true }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={20} sm={20}>
                <InputLabel shrink>Comments</InputLabel>
                <TextareaAutosize
                  minRows={3}
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: "14px",
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </Button>
                {comments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      p: 2,
                      mb: 2,
                      textAlign: "left",
                      marginTop: "4px",
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      Comment: {comment.body}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      At: {comment.createdAt}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      By: {comment.createdBy}
                    </Typography>
                  </Box>
                ))}
              </Grid>
              
              
            </Grid>
          </Paper>
          <Box>
            <Button
              style={{
                backgroundColor: "white",
                marginRight: "8px",
              }}
              onClick={handleSubmit}
            >
              Update Task
            </Button>
            <Button
              style={{
                backgroundColor: "white",
                marginRight: "8px",
              }}
              onClick={onCancel}
            >
              Back
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Task;
