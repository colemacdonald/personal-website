import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class MainNavBar extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Cole Macdonald</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="/wize">Wize</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default MainNavBar;
