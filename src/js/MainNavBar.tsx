import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WizeHome from "./wize/js/components/WizeHome";
import Home from "./Home";

class MainNavBar extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <div className="tab-content">
            <Home/>
          </div>
        </Tab>
        <Tab eventKey="game" title="Wize">
          <div className="tab-content">
            <WizeHome />
          </div>
        </Tab>
      </Tabs>
    );
  }
}
export default MainNavBar;
