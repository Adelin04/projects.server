import React from "react";

import { NavLink } from "react-router-dom";

import { FaFacebookF, FaPhoneSquareAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="wrapper">
        <div className="footer-icon-social">
          <p>
            <FaFacebookF className="facebook-icon" />
          </p>
          <p>
            <FaInstagram className="instagram-icon" />
          </p>
          <p>
            <FaYoutube className="youtube-icon" />
          </p>
        </div>

        <div className="footer-contact">
          <NavLink className="footer-link" to="/">
            <FaMailBulk className="email-icon" />
            Projects@mail.ro
          </NavLink>

          <NavLink className="footer-link" to="/">
            <FaPhoneSquareAlt className="phone-icon" />
            0000.123.123
          </NavLink>
        </div>
      </div>

      <div className="footer-date">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
