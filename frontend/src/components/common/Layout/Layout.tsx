import "./Layout.css";
import React from "react";
export {};

export type LayoutProps = {
  layoutHeader: string;
  layoutFooter: number;
  children: number;
};

/* To Help Style a Page and Grid */
const Layout = (props: LayoutProps) => {
  return (
    <div className="layout_root">
      <div className={"layout_header"}>{props.layoutHeader}</div>
      <div className={"layout_content"}>{props.children}</div>
      <div className={"layoutFooter"}>{props.layoutFooter} </div>
    </div>
  );
};

export default Layout;
