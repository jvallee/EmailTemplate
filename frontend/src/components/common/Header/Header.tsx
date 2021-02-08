import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const company_src =
  "https://careignition.com/wp-content/uploads/2019/12/careignition-Logo-B3-Horizontal-v2.png";

type HeaderProps = {
  image_source?: string;
  className?: string;
};

/**
 * A component for the header that is displated on all pages. Right now has
 * some custom styling and an image of CareIgnitions logo. TODO want to add in a
 * back button and a nav bar
 * @param client - where to pull the image from
 *
 * @returns a react functional component
 *
 * @beta
 */
const Header: React.FC<HeaderProps> = (props) => {
  const { image_source } = props;
  const src = image_source ?? company_src;
  const headerClassName = "header_root " + props.className ?? "";
  return (
    <div className={headerClassName}>
      <div style={{ paddingTop: "20px", marginLeft: "20px" }}>
        <Link to={"/"}>
          <img src={src} width={250} height={43} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
