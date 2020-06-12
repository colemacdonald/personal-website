import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WizeGameComponent from "./wize/js/components/WizeGameComponent";
import Home from "./Home.js";

class MainNavBar extends Component {
  render() {
    return (
      //   <Navbar expand="lg" bg="dark" variant="dark">
      //     <Navbar.Brand href="/">Cole Macdonald</Navbar.Brand>
      //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //     <Navbar.Collapse id="basic-navbar-nav">
      //       <Nav className="ml-auto">
      //         <Nav.Item>
      //           <Nav.Link href="/wize">Wize</Nav.Link>
      //         </Nav.Item>
      //       </Nav>
      //     </Navbar.Collapse>
      //   </Navbar>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Home />
        </Tab>
        <Tab eventKey="game" title="Wize">
          <WizeGameComponent />
        </Tab>
      </Tabs>
    );
  }
}
export default MainNavBar;
