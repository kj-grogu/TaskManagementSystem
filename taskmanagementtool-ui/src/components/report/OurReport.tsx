import React, { useEffect, useState, useRef } from "react";
import ColumnGraph from "./ColumnGraph";
import PieChart from "./PieChart";
import { savePDF } from "@progress/kendo-react-pdf";
// import generatePDF from "./generatePDF";
import {
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import {
  Search,
  AddCircleOutline,
  Notifications,
  Dashboard as DashboardIcon,
  Assignment,
  Settings,
  Group,
  Assessment,
  AccountCircle,
  Logout,
  Inventory2,
  Download as DownloadIcon,
  Close,
  Menu as MenuIcon,
  CenterFocusStrong,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import TaskCard from "../taskcard/TaskCard";
import AddTask from "../addtask/AddTask";
import NotificationPane from "../notification/NotificationPane";
import "./OurReport.css";
import { alignProperty } from "@mui/material/styles/cssUtils";

interface Task {
  id: {
    timestamp: number;
    date: string;
  };
  tid: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  assignedTo: string;
  assignedDate: string | null;
  taskType: string;
  taskCategory: string;
  comments: any[];
  attachments: any[];
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  createdBy: string;
}

interface NotificationPaneProps {
  notifications: string[];
  onClose: () => void;
}

const OurReport: React.FC = () => {
  const user = sessionStorage.getItem("user");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationPaneOpen, setNotificationPaneOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  var newTasksCount = 0;
  var inProgressTasksCount = 0;
  var completedTasksCount = 0;
  // const reportRef = useRef<HTMLElement | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const drawerItems = [
    { text: "Profile", icon: <AccountCircle />, route: "/profile" },
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { text: "Report", icon: <Assessment />, route: "/report" },
    { text: "All Users", icon: <Group />, route: "/userList" },
    { text: "All Tasks", icon: <Inventory2 />, route: "/taskList" },
  ];

  const handleDownloadPDF = async () => {
    try {
      const dataUri = await savePDF(reportRef.current!);
      const link = document.createElement("a");
      // link.href = dataUri || "";
      link.download = "report.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    }
  };

  const handleAddButtonClick = () => {
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
  // const handleDownloadPDF = async () => {
  //   try {
  //     const pdfBlob = await generatePDF();
  //     const url = URL.createObjectURL(pdfBlob);

  //     // Create a temporary <a> element to initiate the download
  //     //tasks.toString
  //     console.log("task are:", JSON.stringify(tasks));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "report.pdf";

  //     // Trigger the download
  //     link.click();

  //     // Clean up by revoking the object URL
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error generating or downloading PDF:", error);
  //   }
  // };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/tasks/all-tasks",
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const data = await response.json();
        setTasks(data);
        console.log("task: ",data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  newTasksCount = tasks.reduce(
    (count, task) => (task.status === "New" ? count + 1 : count),
    0
  );

  inProgressTasksCount = tasks.reduce(
    (count, task) => (task.status === "InProgress" ? count + 1 : count),
    0
  );

  completedTasksCount = tasks.reduce(
    (count, task) => (task.status === "Completed" ? count + 1 : count),
    0
  );

  return (
    <div
      className="dashboard-container"
      style={{ backgroundColor: "#FEF7E2", width: "100%" }}
    >
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
      <br></br>
      <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: "white" , padding: "2rem", fontWeight: "bold"}}
          >
            Task Report
          </Typography>
        </Grid>
      <div className="task-list-container" ref={reportRef} >
        <table className="task-list-table">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
          </tr>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.tid}>
                <td>{task.tid}</td>
                <td className="word-wrap">{task.title}</td>
                <td className="word-wrap">{task.description}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div style={{ width: "100%", alignContent: "center" }}>
          <PieChart
            data={[
              { label: "New Tasks", value: newTasksCount },
              { label: "InProgress Tasks", value: inProgressTasksCount },
              { label: "Completed Tasks", value: completedTasksCount },
              // Add more data points as needed
            ]}
            colors={["#B053BF", "#FF9800", "#4CAF50"]}
            labelColors={{
              New: "#C6D8E6",
              InProgress: "#B6CBE3",
              Completed: "#9AB4DB",
            }}
          />
        </div>
        <br />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#000000" }}
        >
          Download as PDF
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleDownloadPDF}
          sx={{ color: "black" }}
        >
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OurReport;
