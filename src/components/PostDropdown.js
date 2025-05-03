// Bootstrap Components
import Dropdown from "react-bootstrap/Dropdown";

// Bootstrap Icons
import { ThreeDots } from "react-bootstrap-icons";

// CSS
import styles from "../styles/PostDropdown.module.css";

// React
import React from "react";

const PostDropdown = ({ handleEdit, handleDelete, handleReport }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        bsPrefix={styles.DropdownToggle}
        aria-label="Post options"
      >
        <ThreeDots />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.DropdownMenu}>
        {handleEdit && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
            Edit
          </Dropdown.Item>
        )}
        {handleDelete && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete}>
            Delete
          </Dropdown.Item>
        )}
        {handleReport && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleReport}>
            Report
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostDropdown;
