// React
import React from "react";

// Bootstrap Components
import Dropdown from "react-bootstrap/Dropdown";

// Bootstrap Icons
import { ThreeDots } from "react-bootstrap-icons";

const PostDropdown = ({ handleEdit, handleDelete, handleReport }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" bsPrefix="p-0">
        <ThreeDots />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {handleEdit && <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>}
        {handleDelete && (
          <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        )}
        {handleReport && (
          <Dropdown.Item onClick={handleReport}>Report</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostDropdown;
