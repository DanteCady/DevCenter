import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import '../sidebar.css'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <div
            style={{
              textAlign: isCollapsed ? "center" : "right",
              padding: "10px",
              transition: "text-align 0.3s",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRightIcon
                  sx={{ color: "#ffa600", fontSize: "30px !important" }}
                />
              ) : (
                <MenuOpenIcon
                  sx={{ color: "#ffa600", fontSize: "30px !important" }}
                />
              )}
            </IconButton>
          </div>
          <MenuItem>
            <a href="/microservice/files"> Files</a>
          </MenuItem>
          <MenuItem>
            <a href="/microservice/forms"> Forms</a>
          </MenuItem>
          <MenuItem>
            <a href="/microservice/knowledgebase"> KB</a>
          </MenuItem>
          <MenuItem>
            <a href="/microservice/maps"> Maps</a>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
