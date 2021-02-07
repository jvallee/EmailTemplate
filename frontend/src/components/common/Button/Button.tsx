import React, { CSSProperties, useEffect } from "react";
import "./Button.css";

type ButtonProps = {
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = (props) => {
  const buttonClassname = "button_class " + (props.className ?? "");
  return (
    <div className={"button_root"}>
      <button {...props} className={buttonClassname}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
