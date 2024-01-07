import { Menu } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAuth } from "context";

const Sidebar = () => {
  const { user } = useAuth();

  const getRoleSpecificItems = () => {
    const role = user?.role;

    switch (role) {
      case "ADMINISTRATOR":
        return (
          <>
            <StyledMenuItem key="1" icon={<TeamOutlined />}>
              <StyledLink to="/">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="2" icon={<TeamOutlined />}>
              <StyledLink to="/role-change">Role Change</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="3" icon={<UserAddOutlined />}>
              <StyledLink to="/employees">Employee List</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="4" icon={<UserAddOutlined />}>
              <StyledLink to="/employee-management">
                Employee Tag/Untag
              </StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="5" icon={<TeamOutlined />}>
              <StyledLink to="/shift">Shift</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="6" icon={<TeamOutlined />}>
              <StyledLink to="/schedule">Schedule</StyledLink>
            </StyledMenuItem>
          </>
        );

      case "SUPERVISOR":
        return (
          <>
            <StyledMenuItem key="1" icon={<TeamOutlined />}>
              <StyledLink to="/">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="2" icon={<TeamOutlined />}>
              <StyledLink to="/employees">Employee List</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="3" icon={<TeamOutlined />}>
              <StyledLink to="/shift">Shift</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="4" icon={<TeamOutlined />}>
              <StyledLink to="/schedule">Schedule</StyledLink>
            </StyledMenuItem>
          </>
        );

      case "EMPLOYEE":
        return (
          <>
            <StyledMenuItem key="1" icon={<TeamOutlined />}>
              <StyledLink to="/">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem key="2" icon={<TeamOutlined />}>
              <StyledLink to="/my-schedule">Schedule</StyledLink>
            </StyledMenuItem>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <StyledMenu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
      {getRoleSpecificItems()}
    </StyledMenu>
  );
};
export default Sidebar;

const StyledMenu = styled(Menu)`
  width: 240px;
  position: fixed;
  height: calc(100% - 64px);
  background-color: #001529;
  top: 64px;
`;

const StyledMenuItem = styled(Menu.Item)`
  background-color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #000;
  }
`;

const StyledLink = styled(Link)`
  color: #000;
  transition: color 0.3s;
`;
