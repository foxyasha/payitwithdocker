import React, {Component} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MissingPage from "../pages/MissingPage";
import Store from "../pages/Store";
import Reset from "../pages/Reset";
import Settings from "../pages/Settings";
import AddProduct from "../pages/AddProduct"
import Cart from "../pages/Cart";
import MyProducts from "../pages/MyProducts";

class AppRouter extends Component {
    render() {
        return (
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/reg" element={<SignUp/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/add" element={<AddProduct/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/myproducts" element={<MyProducts/>}/>
                    <Route path="/update/:id" element={<AddProduct/>}/>
                    <Route path="/error" element={<MissingPage/>}/>
                    <Route path="*" element={<Navigate to="/error" replace/>}/>
                </Routes>
        );
    }
}

export default AppRouter;