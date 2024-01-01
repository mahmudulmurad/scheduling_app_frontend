import AppLayout from "layout";
import styled from "styled-components";
import RoleChangeUi from "ui/roleChange";
const RoleChange = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <RoleChangeUi />
      </StyledProfile>
    </AppLayout>
  );
};

export default RoleChange;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
