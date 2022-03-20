import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GiantButton } from "../components/Buttons";
import { SilhouetteType } from "./Silhouettes";

const Home = () => 
    <Container className="page home" fluid>
        <Row>
            <Col className="vertical-flex-box centered">
                <p className="title">Welcome!</p>
                <img className="home-image" src={require("../../resources/home/cole2.jpeg")} />

                <p className="subtitle">Click below to learn more about Cole Macdonald.</p>
            </Col>
        </Row>
        <Row className="nav-buttons">
            <Col sm>
                <GiantButton text="THE HUMAN" href="#/thehuman"  silhouetteType={SilhouetteType.Head}/>
            </Col>
            <Col sm>
                <GiantButton text="THE ENGINEER" href="#/theengineer" silhouetteType={SilhouetteType.Gear}/>    
            </Col>
        </Row>
    </Container>;

export { Home };
