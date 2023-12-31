import AppLayout from "layout";
import styled from "styled-components";
import ScheduleUi from "ui/schedule";
const Schedule = () => {
  return (
    <AppLayout>
      <StyledProfile>
        <ScheduleUi />
      </StyledProfile>
    </AppLayout>
  );
};

export default Schedule;

const StyledProfile = styled("div")`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
