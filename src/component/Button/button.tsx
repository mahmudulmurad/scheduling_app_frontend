import * as React from "react";
import { TShape, TSize, TType } from "./decorator";
import { Button } from "antd";

export interface IUiButtonProps {
  id?: string;
  title: React.ReactNode;
  type: TType;
  size?: TSize;
  shape?: TShape;
  disabled?: boolean;
  loading?: boolean;
  htmlType: "submit" | "button";
  danger?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
}
export const UiButton = (props: IUiButtonProps) => {
  const {
    id,
    danger,
    htmlType,
    loading,
    shape = "default",
    size = "middle",
    type = "primary",
    title,
    disabled,
    onClick,
    style,
  } = props;

  return (
    <Button
      id={id}
      htmlType={htmlType}
      shape={shape}
      size={size}
      type={type}
      disabled={disabled || loading}
      danger={danger}
      onClick={onClick}
      style={style}
    >
      {title}
    </Button>
  );
};
