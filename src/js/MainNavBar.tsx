import React from 'react';
import { Dropdown } from 'react-bootstrap';

export const MainNavBar = () => {
  return (
    <div className="nav-bar">
      <div className="home-icon">
        <a href="#/">
          <svg height={40} width={40}>
            <rect x={28} y={2} height={30} width={5} rx={1} />
            <polygon points="5,35 5,17 20,5, 35,17 35,35" />
            <polygon className="door" points="16,35 16,25 24,25 24,35" />
          </svg>
        </a>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle id="nav-dropdown" className="nav-dropdown2 hide-after">
            <div />
            <div />
            <div />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/thehuman">The Human</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/wize">Wize</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/theengineer">The Engineer</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
