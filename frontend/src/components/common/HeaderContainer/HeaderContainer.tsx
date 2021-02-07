import React, { CSSProperties, useEffect } from "react";
import "./HeaderContainer.css";

type HeaderContainerProps = {
  className?: string;
  headercontent?: string;
  subHeaderContent?: string;
};

const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  const headerClassName = "headerContainerRoot " + (props.className ?? "");

  return <div className={headerClassName}>{props.children}</div>;
};

export default HeaderContainer;
