import React, {useEffect} from "react";
import './styles/Animation.css'
import {signOut} from "firebase/auth";
import {auth} from "./UI/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import "./styles/Navigation.css"
import {Navbar} from "react-bootstrap";

const Navigation = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);
    const settings = () =>{
        navigate("/settings")
    }
    const cart = () =>{
        navigate("/cart")
    }
    const storepage = () =>{
        navigate("/store")
    }
    const addProducts = () =>{
        navigate("/add")
    }
    const myproducts = () =>{
        navigate("/myproducts")
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="nave">
            <div className="navigate">
                <div className="typewriter-logo" >
                    <Navbar.Brand href="/store" >
                    <h1>Payit</h1>
                    </Navbar.Brand>
                </div>
                <a className="menu">
                    <span className="menu-title">Account</span>
                    <ul className="menu-dropdown">
                        <li onClick={storepage}>Store</li>
                        <li onClick={addProducts}>Add product</li>
                        <li onClick={myproducts}>My products</li>
                        <li onClick={cart}>Cart</li>
                        <li onClick={settings}>Settings</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </a>
            </div>
        </div>
    );
};

export default Navigation;

