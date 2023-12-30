import { Menu } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <StyledMenu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
      <StyledMenuItem key="1" icon={<TeamOutlined />}>
        <StyledLink to="/">Home</StyledLink>
      </StyledMenuItem>
      <StyledMenuItem key="2" icon={<UserAddOutlined />}>
        <StyledLink to="/employees">Employees</StyledLink>
      </StyledMenuItem>
      <StyledMenuItem key="3" icon={<UserOutlined />}>
        <StyledLink to="/shift">Shift List</StyledLink>
      </StyledMenuItem>
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
