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
      <div style={{ paddingTop: "20px", marginLeft: "20px" }}>
        <img
          src={
            "https://careignition.com/wp-content/uploads/2019/12/careignition-Logo-B3-Horizontal-v2.png"
          }
          width={250}
          height={43}
        />
      </div>
    </div>
  );
};

export default Header;
