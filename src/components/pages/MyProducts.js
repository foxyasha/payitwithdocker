import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "../styles/Store.css";
import {auth, db} from '../UI/firebaseConfig';
import {Button, Card, CardGroup, Container, Image, Spinner} from "react-bootstrap";
import {collection, doc, onSnapshot, deleteDoc} from "firebase/firestore";
import Particle from "../styles/Particle";
import button from "bootstrap/js/src/button";
import Navigation from "../Navigation.js";
import "../styles/Store.css";
import Modal from "../ModalComp";

const Store =  () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    const [loadings, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [product, setProduct] = useState({})
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);

    useEffect(()=>{
        setLoading(true);
        const unsub = onSnapshot(collection(db,"products"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                list.push({id: doc.id, ...doc.data()})
            });
            setProducts(list);
            setLoading(false);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);

    const handleClick = (item) =>{
        setOpenModal(true)
        setProduct(item)
    }

    const handleDelete = async (id) =>{
        if(window.confirm("Are you sure to delete this product?")){
            try{
                await deleteDoc(doc(db, "products", id));
                setProducts(products.filter((product) => product.id !== id))
                setOpenModal(false)
            } catch(err){
                console.log(err);
            }
        }
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

    const html = (item) => {
        if (item.userUid === user.uid){
            return (
                <div key={item.id} className="card">
                    <Image src={item.img} className="image"/>
                    {item.userUid === user.uid ? <img height="auto" width="auto"  className="top-left" src="https://static.vecteezy.com/system/resources/previews/010/829/962/original/green-tick-checkbox-illustration-isolated-free-png.png"/> : ""}
                    <Card.Header style={{marginTop: "10px"}} className="cardInfo">
                        <h5>Product: <i>{item.title}</i></h5>
                        <label>Price: <i className="bold">{item.price} $</i></label>
                        <label>Seller: <i className="bold">{item.username}</i></label>
                        <div className="viewCard">
                            <span className="bold">For more information:</span>
                            <button  className="btn btn-dark btn-sm btnSize" onClick={() => handleClick(item)}>
                                View
                            </button>
                        </div>
                    </Card.Header>
                </div>
            );
        }
    }

    return (
        <>
            <Navigation />
            <div className="bg-storeimage" >
                <Particle/>
                <Container className="HomeDesc">
                    <div className="products">
                        {products && products.map((item)=>(html(item)))}
                    </div>
                </Container>
            </div>
            <Modal open={openModal} close={() => {setOpenModal(false)}} {...product} handleDelete= {handleDelete} />
        </>

    );
}


export default Store;
