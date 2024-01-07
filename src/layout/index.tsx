import { Layout, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TAppLayoutProps } from "./decorator";
import { useAuth } from "context";
import Sidebar from "./sidebar";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AppLayout = ({ children }: TAppLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    if (value === "profile") {
      navigate("/profile");
    } else if (value === "logout") {
      logout();
    }
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <StyledTitle>Scheduling Application</StyledTitle>
        <Select
          defaultValue="select"
          style={{ width: 120 }}
          onChange={handleSelectChange}
        >
          <Option value="select" disabled>
            Select
          </Option>
          <Option value="profile">Profile</Option>
          <Option value="logout">Logout</Option>
        </Select>
      </StyledHeader>
      <Layout>
        <StyledContent>{children}</StyledContent>
        <Sidebar />
      </Layout>
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100%;
  position: fixed;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  && {
    color: #fff;
  }
`;

const StyledContent = styled(Content)`
  padding: 1em;
  text-align: center;
  overflow: scroll;
`;
