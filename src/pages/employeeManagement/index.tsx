import AppLayout from "layout";
import styled from "styled-components";
import EmployeeManagementUi from "ui/employeeManagement";

const EmployeeManagement = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <EmployeeManagementUi />
      </StyledProfile>
    </AppLayout>
  );
};

export default EmployeeManagement;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
