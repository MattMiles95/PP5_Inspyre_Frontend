// Bootstrap Components
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// CSS
import appStyles from "../../App.module.css";

// Local Components
import ProfileEditDetails from "./DetailsEditForm";
import PasswordEditForm from "./PasswordEditForm";
import UsernameEditForm from "./UsernameEditForm";

// React
import React from "react";

const ProfileEditForm = () => {
  return (
    <Container className={appStyles.Content}>
      <Tabs
        defaultActiveKey="profile"
        id="profile-edit-tabs"
        className={`mb-3 custom-tabs`}
        fill
      >
        <Tab eventKey="profile" title="Profile">
          <ProfileEditDetails />
        </Tab>
        <Tab eventKey="username" title="Username">
          <UsernameEditForm />
        </Tab>
        <Tab eventKey="password" title="Password">
          <PasswordEditForm />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfileEditForm;
