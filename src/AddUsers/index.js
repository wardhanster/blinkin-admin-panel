import React, { useState } from "react";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import classnames from "classnames";

import "./add__user.css";

import AddSingleUser from "./lib/AddSingleUser";
import AddBulkUsers from "./lib/AddBulkUsers";

export default function AddUsers({
  handleSingleUserAPI,
  handleBulkUploadFile,
}) {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container className="mt-3 add__user__container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Add Single User{" "}
            <i className="fa fa-user fi-color" aria-hidden="true"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Add Bulk Users{" "}
            <i className="fa fa-users fi-color" aria-hidden="true"></i>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <AddSingleUser handleSingleUserAPI={handleSingleUserAPI} />
        </TabPane>
        <TabPane tabId="2">
          <AddBulkUsers handleBulkUploadFile={handleBulkUploadFile} />
        </TabPane>
      </TabContent>
    </Container>
  );
}
