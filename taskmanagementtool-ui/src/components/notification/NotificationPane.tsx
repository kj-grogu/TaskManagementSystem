import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

interface NotificationPaneProps {
  notifications: string[];
  onClose: () => void;
}

const NotificationPane: React.FC<NotificationPaneProps> = ({
  notifications,
  onClose,
}) => {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Notifications
      </Typography>

      {notifications.length > 0 ? (
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No new notifications</Typography>
      )}
      <Box marginTop="auto">
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Box>
  );
};

export default NotificationPane;
