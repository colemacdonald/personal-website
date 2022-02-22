import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WizeHome from "./wize/js/components/WizeHome";
import Home from "./Home";
import { RandomWizeGameController } from "./wize/js/game/controllers/RandomWizeGameController";
import { WizeGameController } from "./wize/js/game/controllers/WizeGameController";
import { Nav, Navbar } from "react-bootstrap";

class MainNavBar extends Component {
    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#/">Cole Macdonald</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="#/wize">Wize</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default MainNavBar;
