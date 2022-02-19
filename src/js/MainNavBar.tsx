import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WizeHome from "./wize/js/components/WizeHome";
import Home from "./Home";
import { RandomWizeGameController } from "./wize/js/game/controllers/RandomWizeGameController";
import { WizeGameController } from "./wize/js/game/controllers/WizeGameController";

class MainNavBar extends Component {
  render() {
    var gameProps = {
      gameController: new RandomWizeGameController()
    }
    return (
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <div className="tab-content">
            <Home/>
          </div>
        </Tab>
        <Tab eventKey="game" title="Wize">
          <div className="tab-content">
            <WizeHome {...gameProps}/>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
export default MainNavBar;
