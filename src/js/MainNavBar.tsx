import React from "react";
import { Dropdown } from "react-bootstrap";

const MainNavBar = () => 
    <div className="nav-bar horizontal-flex-box centered">
        <a className="home-icon" href="#/">
            <svg height={40} width={40}>
                <rect x={28} y={2} height={30} width={5} rx={1}/>
                <polygon points="5,35 5,17 20,5, 35,17 35,35"/>
                <polygon className="door" points="16,35 16,25 24,25 24,35" />
            </svg>
        </a>
        <div className="ml-auto">
            <div className="horizontal-flex-box">
                <Dropdown>
                    <Dropdown.Toggle id="nav-dropdown" className="hide-after nav-dropdown-toggle vertical-flex-box centered">
                         <div/><div/><div/>
                     </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/thehuman">The Human</Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item href="#/wize">Wize</Dropdown.Item>
                        <Dropdown.Item href="#/wizeabout">About Wize</Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item href="#/theengineer">The Engineer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>;

export { MainNavBar };
