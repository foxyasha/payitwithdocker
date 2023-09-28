import React, {Component, useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import '../styles/Animation.css'
import Particle from "../styles/Particle";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../UI/firebaseConfig";


const Home = () => {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/store");
    }, [user, loading]);


    return (
        <body>
            <Navbar fixed="top" expand="md" variant="dark" >
                <Container>
                    <Navbar.Brand href="/" >
                            <div className="typewriter-logo">
                                <h1>PAYIT</h1>
                            </div>
                    </Navbar.Brand>
                    <Nav>
                        <header>
                            <div>
                                <Link to="/Login">
                                    <button className="button-style-without-border">Sign in</button>
                                </Link>
                                <Link to="/Reg">
                                    <button className="button-style"><span>Sign up</span></button>
                                </Link>
                            </div>
                        </header>
                    </Nav>
                </Container>
            </Navbar>
            <div className="bg-image">
                <div className="center-blur">
                    <div className="central-body">
                        <div className="HomeDesc">
                            <h1 className={"main-description" }>Sell digital downloads, courses, coaching
                                and more from one simple platform.</h1>
                            <h2 className={"sub-description" }>We make it easy for you to sell anything online anywhere.</h2>
                            <footer>
                                <p className="words-color">Signup for free • No card required</p>
                            </footer>
                            <Link to="/Reg">
                                <button className="btn-go-home" ><span>Sign up</span></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Particle/>
        </body>



    );

};

export default Home;

