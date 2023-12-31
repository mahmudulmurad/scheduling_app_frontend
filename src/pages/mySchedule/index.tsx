import AppLayout from "layout";
import styled from "styled-components";
import MyShiftListUi from "ui/mySchedule";
const MySchedule = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <MyShiftListUi />
      </StyledProfile>
    </AppLayout>
  );
};

export default MySchedule;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
