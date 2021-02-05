import React from "react";
import "./BorderBox.css";

export type BorderBoxProps = {
  className?: string;
};

const BorderBox: React.FC<BorderBoxProps> = (props) => {
  const className = "border_box" + (props.className ?? "");

  return <div className={className}>{props.children}</div>;
};

export default BorderBox;
