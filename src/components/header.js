import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './styles/Animation.css'

const Header = () => {
    return (

            <Navbar fixed="top" expand="md" variant="dark">
                <Container>
                    <Navbar.Brand href="/" >
                        <div className="typewriter-logo">
                            <h1>PAYIT</h1>
                        </div>
                    </Navbar.Brand>
                    <Nav>
                    </Nav>
                </Container>
            </Navbar>

    );
};

export default Header;