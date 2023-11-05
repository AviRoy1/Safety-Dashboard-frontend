import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReportIcon from "@mui/icons-material/Report";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        backgroundColor: "#0A0C4D",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {["Live", "Analytics", "Report", "Support", "Settings"].map(
          (text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ justifyContent: "center", padding: "10px" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <LiveTvIcon
                      style={{
                        color: "blue",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  ) : index === 1 ? (
                    <TimelineIcon
                      style={{
                        color: "green",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  ) : index === 2 ? (
                    <ReportIcon
                      style={{
                        color: "red",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  ) : index === 3 ? (
                    <SupportAgentIcon
                      style={{
                        color: "orange",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  ) : index === 4 ? (
                    <SettingsIcon
                      style={{
                        color: "purple",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  ) : (
                    <LogoutIcon
                      style={{
                        color: "black",
                        fontSize: 32,
                        backgroundColor: "white",
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  style={{ fontSize: 18, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />

      <List
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {["Logout"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ justifyContent: "center", padding: "10px" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon
                  style={{
                    color: "black",
                    fontSize: 32,
                    backgroundColor: "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={text}
                style={{ fontSize: 18, color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer("left", true)}>{anchor}</Button> */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
