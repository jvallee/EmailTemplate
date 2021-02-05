import React, { CSSProperties, useEffect } from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { ApiApi, Job } from "../../../util/gen/api/dist";

type ButtonProps = {
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className={props.className ?? "button_root"}>
      <button className={"button_class"} {...props}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
