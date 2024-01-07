import styled from "styled-components";

interface IWrapper<T> {
  child: T;
}

export const PageWrapperStyle = <T extends React.ElementType>(
  component: T
) => styled(component)<IWrapper<React.ReactNode>>`
  width: calc(100% - 240px);
  position: fixed;
  height: calc(100% - 64px);
  top: 64px;
  left: 240px;
`;
