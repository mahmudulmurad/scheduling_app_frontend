import AppLayout from "layout";
import { Toast } from "component/Toast";
import ProfileUI from "ui/profile";
import styled from "styled-components";
const Profile = () => {
  return (
    <AppLayout>
      <Toast />
      <StyledProfile>
        <ProfileUI />
      </StyledProfile>
    </AppLayout>
  );
};

export default Profile;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
