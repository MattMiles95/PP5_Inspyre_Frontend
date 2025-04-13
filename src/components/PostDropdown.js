// Bootstrap Components
import Dropdown from "react-bootstrap/Dropdown";

// Bootstrap Icons
import { ThreeDotsVertical } from "react-bootstrap-icons";

// CSS
import styles from "../styles/Post.module.css";

function PostDropdown({ handleEdit, handleDelete }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="div"
        className={`d-flex align-items-center ${styles.PostDropdownToggle}`}
      >
        <ThreeDotsVertical role="button" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={`text-center ${styles.PostDropdownMenu}`}>
        <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.DropdownItem} text-danger`}
          onClick={handleDelete}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PostDropdown;
