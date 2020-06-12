import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Home from "./Home.js";
import WizeGameComponent from "./wize/js/components/WizeGameComponent.js";

class NavBar extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Home />
        </Tab>
        <Tab eventKey="game" title="Game">
          <WizeGameComponent />
        </Tab>
      </Tabs>
    );
  }
}
export default NavBar;
