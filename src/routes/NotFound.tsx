import styled from "styled-components";

const NotFoundStyled = styled.div`
  background: #001529;
  color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundRoutes = () => {
  return <NotFoundStyled>404 not found</NotFoundStyled>;
};

export default NotFoundRoutes;
