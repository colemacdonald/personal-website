import React, { Component } from "react";
import { Navbar, Nav, Tabs, Tab } from "react-bootstrap";
import WizeHome from "./wize/js/components/WizeHome";
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
