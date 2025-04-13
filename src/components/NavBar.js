// React
import React from "react";
import { NavLink } from "react-router-dom";

// API
import axios from "axios";

// Assets
import logo from "../assets/inspyre_logo.png";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

// CSS
import styles from "../styles/NavBar.module.css";

// Local Components
import Avatar from "./Avatar";

// Utils
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInNavbar = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} mr-4 ${styles.InspyreLink} ${
            isActive ? styles.ActiveBtn : ""
          }`
        }
        to="/inspyre"
      >
        Inspyre +
      </NavLink>

      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          className={`${styles.NavLinkAvatar} ${styles["dropdown-toggle"]}`}
        >
          <Avatar
            src={currentUser?.profile_image}
            text=""
            height={40}
            className="m-2"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className="p-0">
          <Dropdown.Item className={`${styles.DropdownItem} py-2 px-0 m-0`}>
            <NavLink
              className={({ isActive }) =>
                `${styles.MenuNavLink} ${isActive ? styles.ActiveMenu : ""}`
              }
              to="/profile"
            >
              Profile
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item
            className={`${styles.DropdownDivider} ${styles.DropdownItem} py-2 px-0 m-0`}
          >
            <NavLink
              className={({ isActive }) =>
                `${styles.MenuNavLink} ${isActive ? styles.ActiveMenu : ""}`
              }
              to="/sparks"
            >
              Sparks
            </NavLink>
          </Dropdown.Item>

          <Dropdown.Item
            className={`${styles.DropdownDivider} ${styles.MenuNavLink} ${styles.DropdownItem} py-3 pl-2 m-0`}
            onClick={handleSignOut}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedOutNavbar = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} mr-4 ${isActive ? styles.Active : ""}`
        }
        to="/signin"
      >
        Login
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} mr-4 ${isActive ? styles.Active : ""}`
        }
        to="/signup"
      >
        Join
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} fixed="top" bg="dark" variant="dark">
      <Container className="d-flex justify-content-between align-items-center flex-wrap">
        {/* Logo */}
        <NavLink to="/" className={`${styles.LogoLink} d-flex align-items-center mb-2 mb-md-0`}>
          <Navbar.Brand>
            <img src={logo} alt="logo" className={styles.Logo} />
          </Navbar.Brand>
        </NavLink>

        <Nav className="d-flex align-items-center flex-wrap text-left">
          <NavLink
            className={({ isActive }) =>
              `${styles.Discover} mr-4 ${isActive ? styles.Active : ""}`
            }
            to="/"
          >
            Discover
          </NavLink>
          <span className={`${styles.Divider} mr-4`}>|</span>
          {currentUser ? loggedInNavbar : loggedOutNavbar}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
