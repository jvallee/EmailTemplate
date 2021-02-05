import React, { useState } from "react";
import "./Header.css";

type HeaderProps = {
  image_source?: string;
  className?: string;
};
const Header: React.FC<HeaderProps> = (props) => {
  const { children, image_source } = props;
  const headerClassName = "header_root " + props.className ?? "";
  return (
    <div className={headerClassName}>
      <div style={{ paddingTop: "40px", marginLeft: "20px" }}>
        <img
          src={
            "https://uploads-ssl.webflow.com/5cbe0c945e636f107c79b29e/5d40e717eee5234153ff2570_dover-logo-script-aqua.svg"
          }
          width={130}
        />
      </div>
    </div>
  );
};

export default Header;
