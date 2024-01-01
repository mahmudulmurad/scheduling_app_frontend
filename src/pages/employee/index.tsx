import AppLayout from "layout";
import styled from "styled-components";
import EmployeeUi from "ui/employee";

const Employee = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <EmployeeUi />
      </StyledProfile>
    </AppLayout>
  );
};

export default Employee;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
