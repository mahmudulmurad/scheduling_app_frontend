import AppLayout from "layout";
import styled from "styled-components";
import ShiftComponent from "ui/shift";

const Shift = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <ShiftComponent />
      </StyledProfile>
    </AppLayout>
  );
};

export default Shift;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
