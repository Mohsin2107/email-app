import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
  AccountCircleOutlined,
  Search,
} from "@mui/icons-material";

import { gmailLogo } from "../constants/constant";
import { useEffect, useState } from "react";
import User from "../../../backend/model/userSchema";

const StyledAppBar = styled(AppBar)`
  background: #f5f5f5;
  box-shadow: none;
`;

const SearchWrapper = styled(Box)`
  background: #eaf1fb;
  margin-left: 80px;
  border-radius: 8px;
  min-width: 690px;
  max-width: 720px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  & > div {
    width: 100%;
  }
`;

const OptionsWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
  & > svg {
    margin-left: 20px;
  }
`;

const Header = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.open(`http://localhost:8000/logout`, "_self");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuIcon color="action" onClick={toggleDrawer} />
        <img
          src={gmailLogo}
          alt="logo"
          style={{ width: 110, marginLeft: 15 }}
        />
        <SearchWrapper>
          <Search color="action" />
          <InputBase />
          <Tune color="action" />
        </SearchWrapper>

        <OptionsWrapper>
          <HelpOutlineOutlined color="action" />
          <SettingsOutlined color="action" />
          <AppsOutlined color="action" />
          <div>
            <img
              src=""
              alt="user-profile"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                marginLeft: 20,
                cursor: "pointer",
              }}
              onClick={handleClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>Mohsin</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </OptionsWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
