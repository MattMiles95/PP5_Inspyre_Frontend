// Bootstrap Icons
import { ThreeDots } from "react-bootstrap-icons";

// CSS
import styles from "../styles/CustomDropdown.module.css";

// Hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

// React
import React, { useEffect, useRef, useState } from "react";

// React DOM
import ReactDOM from "react-dom";

const CustomDropdown = ({ handleEdit, handleDelete, handleReport }) => {
  const { expanded: show, setExpanded: setShow, ref } = useClickOutsideToggle();
  const toggleRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    if (show && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.right - 120 + window.scrollX}px`,
        zIndex: 2000,
      });
    }
  }, [show]);

  return (
    <>
      <button
        ref={toggleRef}
        className={styles.DropdownToggle}
        onClick={() => setShow((prev) => !prev)}
        aria-label="Post options"
      >
        <ThreeDots />
      </button>

      {show &&
        ReactDOM.createPortal(
          <div ref={ref} className={styles.DropdownMenu} style={menuStyle}>
            {handleEdit && (
              <div
                className={styles.DropdownItem}
                onClick={() => {
                  handleEdit();
                  setShow(false);
                }}
              >
                Edit
              </div>
            )}
            {handleDelete && (
              <div
                className={styles.DropdownItem}
                onClick={() => {
                  handleDelete();
                  setShow(false);
                }}
              >
                Delete
              </div>
            )}
            {handleReport && (
              <div
                className={styles.DropdownItem}
                onClick={() => {
                  handleReport();
                  setShow(false);
                }}
              >
                Report
              </div>
            )}
          </div>,
          document.getElementById("dropdown-root")
        )}
    </>
  );
};

export default CustomDropdown;
