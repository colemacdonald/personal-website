import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WizeHome from "./wize/js/components/WizeHome";
import Home from "./Home.js";

class MainNavBar extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Home className="tab-content" />
        </Tab>
        <Tab eventKey="game" title="Wize">
          <WizeHome className="tab-content" />
        </Tab>
      </Tabs>
    );
  }
}
export default MainNavBar;
