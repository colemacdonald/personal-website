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
                <Navbar.Brand href="/personal-website">Cole Macdonald</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="/personal-website/wize">Wize</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            // <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            //     <Tab eventKey="home" title="Home">
            //         <div className="tab-content">
            //             <Home />
            //         </div>
            //     </Tab>
            //     <Tab eventKey="game" title="Wize">
            //         <div className="tab-content">
            //             <WizeHome />
            //         </div>
            //     </Tab>
            // </Tabs>
        );
    }
}
export default MainNavBar;
