import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/AddProduct.css";
import "../styles/Store.css";
import {auth, db} from '../UI/firebaseConfig';
import {Card, CardGroup, Container, Image, Spinner} from "react-bootstrap";
import {collection, doc, onSnapshot, deleteDoc} from "firebase/firestore"
import Particle from "../styles/Particle";
import {GridColumn} from "semantic-ui-react";
import button from "bootstrap/js/src/button";
import Navigation from "../Navigation";
import ValidData from "../ValidData";
import validData from "../ValidData";


const Cart = () => {
    const [user, loading] = useAuthState(auth);
    const [mas] = useState([]);
    const [isEmpty] = useState(false);
    const [carts, setCarts] = useState([]);


    useEffect(()=>{
        const unsub = onSnapshot(collection(db,"carts"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                list.push({id: doc.id, ...doc.data()})
                mas.push(doc.id);
                console.log(mas)
            });
            setCarts(list);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);


    const handleDeleteCart = async (index) =>{
            try{
                await deleteDoc(doc(db,"carts", mas[index]));
                mas.splice(index, 1);
                ValidData("Product was deleted", true)
            } catch(err){
                ValidData("Delete failed", false)
            }
    }

    const checkout = () => {
        validData("Redirect to checkout", true)
    }

    if(loading){
        return <Spinner style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent:"center",
            display:"flex",
            marginTop:"300px"
        }}/>
    }

    const html = (item, index) => {
        if (user.uid === item.buyeruid){
            const products = document.getElementById('products')
            products.classList.add('products');
            return (
                <div className="card">
                    <Image src={item.img} className="image"/>
                    <Card.Header style={{marginTop: "10px"}} className="cardInfo">
                        <h5>Product: <i>{item.title}</i></h5>
                        <label>Price: <i className="bold">{item.price} $</i></label>
                        <label>Seller: <i className="bold">{item.username}</i></label>
                        <label>Qty: <i className="bold">{item.count}</i></label>
                        <div className="viewCard">
                            <span className="bold">Delete from cart: </span>
                            <button className="btn btn-dark btn-sm btnSize" onClick={()=> handleDeleteCart(index)}>Delete</button>
                        </div>
                    </Card.Header>
                </div>

            );
        }
    }

    return (
        <>
            <Navigation/>
            <div className="bg-settingsimage">
                <Particle/>
                <Container className="HomeDesc">
                    <h1 style={{color: 'white', margin: "20px auto"}}> Your cart </h1>
                    <div id="products">
                        {(mas.length !== 0)
                            ? carts.map((item, index)=>(html(item, index)))
                            : ''}
                    </div>
                    <button className="btn btn-dark btn-sm btnSize" style={{margin: "0 auto", width:"auto"}} onClick={checkout}>Proceed to checkout</button>
                </Container>
            </div>
        </>
    );
}

export default Cart;


