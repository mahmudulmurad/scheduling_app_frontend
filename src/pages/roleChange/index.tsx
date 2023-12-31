import AppLayout from "layout";
import styled from "styled-components";
import EmployeeListForRoleChange from "ui/roleChange";
const RoleChange = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <EmployeeListForRoleChange />
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
