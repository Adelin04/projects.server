import React from "react";
import { NavLink } from "react-router-dom";

//Template for NavBar Links
const NavLinkTemplate = (props) => {
  return (
    <section>
      <NavLink className="navLinkTemplate-links"  to={props.url} >
        {props.linkName} 
      </NavLink>
    </section>
  );
};

export default NavLinkTemplate;
