// Assets
import logo from "../assets/inspyre_logo.png";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Context
import { useCurrentUser } from "../contexts/CurrentUserContext";

// CSS
import styles from "../styles/NavBar.module.css";

// Hooks
import { useHandleSignOut } from "../hooks/useHandleSignOut";

// Local Components
import Avatar from "./Avatar";

// React
import React, { useEffect, useState } from "react";

// React Router
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const handleSignOut = useHandleSignOut();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loggedInNavbar = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} mr-4 ${
            isMobile ? styles.InspyreMobile : styles.InspyreLink
          } ${isActive ? styles.ActiveBtn : ""}`
        }
        to="/posts/inspyre"
      >
        {isMobile ? "+" : "Inspyre +"}
      </NavLink>

      <NavLink
        className={({ isActive }) => {
          const isMessagesPage =
            location.pathname.startsWith("/messages/conversation") ||
            location.pathname.startsWith("/conversations");
          return `${styles.NavLink} mr-4 ${styles.MessageIcon} ${
            isMessagesPage ? styles.ActiveIcon : ""
          }`;
        }}
        to="/conversations"
      >
        <i className="fa-solid fa-comments"></i>
      </NavLink>

      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          className={`${styles.NavLinkAvatar} ${styles["dropdown-toggle"]}`}
        >
          <Avatar
            src={currentUser?.profile_image}
            text=""
            height={60}
            className="m-2"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" className={styles.NavbarDropdownMenu}>
          <Dropdown.Item
            as={NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
            className={`${styles.NavbarDropdownItem} py-2 m-0 ${styles.MenuNavLink}`}
          >
            Profile
          </Dropdown.Item>

          <Dropdown.Item
            as={NavLink}
            to="/pyres"
            className={`${styles.NavbarDropdownItem} py-2 m-0 ${styles.MenuNavLink}`}
          >
            Pyres
          </Dropdown.Item>

          <Dropdown.Item
            as={NavLink}
            to="/sparks"
            className={`${styles.NavbarDropdownItem} py-2 m-0 ${styles.MenuNavLink}`}
          >
            Sparks
          </Dropdown.Item>

          <Dropdown.Item
            className={`${styles.NavbarDropdownItem} py-2 m-0`}
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
        <NavLink
          to="/"
          className={`${styles.LogoLink} d-flex align-items-center mb-2 mb-md-0`}
        >
          <Navbar.Brand>
            <img src={logo} alt="logo" className={styles.Logo} />
          </Navbar.Brand>
        </NavLink>

        <Nav className="d-flex align-items-center flex-wrap text-left">
          {isMobile ? (
            <NavLink
              className={({ isActive }) =>
                `${styles.MobileDiscoverIcon} mr-4 ${
                  isActive ? styles.ActiveIcon : ""
                }`
              }
              to="/"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `${styles.Discover} mr-4 ${isActive ? styles.Active : ""}`
              }
              to="/"
            >
              Discover
            </NavLink>
          )}

          <span className={`${styles.Divider} mr-4`}>|</span>
          {currentUser ? loggedInNavbar : loggedOutNavbar}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
