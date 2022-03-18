import React from "react";
import { Dropdown } from "react-bootstrap";

const MainNavBar = () => 
    <div className="nav-bar horizontal-flex-box centered">
        <a className="home-icon" href="#/">
            <svg height={40} width={40}>
                <rect x={28} y={2} height={30} width={5} rx={1}/>
                <polygon points="5,35 5,17 20,5, 35,17 35,35"/>
            </svg>
        </a>
        <div className="ml-auto">
            <div className="horizontal-flex-box">
                <Dropdown>
                    <Dropdown.Toggle id="personal">The Human</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/thehuman">Home</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/wize">Wize</Dropdown.Item>
                        <Dropdown.Item href="#/wizeabout">About Wize</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle id="professional">The Engineer</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/theengineer">Home</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>;

export { MainNavBar };
