import React, { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiApi, Job } from "../../../util/gen/api/dist";
import "./HeaderContainer.css";

type HeaderContainerProps = {
  apiService?: ApiApi;
  className?: string;
};

const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  const headerClassName = "headerContainerRoot " + props.className ?? "";

  return <div className={headerClassName}>{props.children}</div>;
};

export default HeaderContainer;
