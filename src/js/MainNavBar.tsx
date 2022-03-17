import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

class MainNavBar extends Component {
    render() {
        return (
            <Navbar className="nav-bar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="#/">Home</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link href="#/wize">Wize</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#/wizeabout">About Wize</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default MainNavBar;
