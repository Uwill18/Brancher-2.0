import './App.css';
import React, {useState,useEffect} from 'react'
import Products from './components/Products/Products';
//import Product from './components/Products/Product/Product';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/commerce'
import Cart from './components/Cart/Cart';
import { Routes, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

//import {Products, Navbar} from './components';



const App = () => {

  /**used stateful variables and effects to update the arrary for products */
  const[products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState({});
  const[errorMessage,setErrorMessage] = useState('');


  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () =>{
    setCart(await commerce.cart.retrieve());
  }


  //implementing CRUD principles using data from APIs
  const handleAddToCart = async (productId, quantity) =>{
    const item = await commerce.cart.add(productId, quantity);

    setCart(item);
  }


  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  };

  const refreshCart = async () => {
    const response= await commerce.cart.refresh();

    setCart(response);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      


      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };




//hook starts as empty on render

  useEffect(()=> {
  fetchProducts();
  fetchCart();
  },[]);
 // console.log(products);
  console.log(cart);
  console.log(cart?.total_items);

  return (
   
    <div>
      {/* may wrap an error boundary around navbar per console:
       https://reactjs.org/docs/error-boundaries.html*/}
    
   
   <Navbar totalItems={cart?.total_items}/>
    <Routes>
      <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>} />
      <Route path='/cart' 
              element={<Cart cart={cart} 
              onUpdateCartQty={handleUpdateCartQty} 
              onRemoveFromCart={handleRemoveFromCart} 
              onEmptyCart={handleEmptyCart} />} />
      <Route path='/checkout' element={<Checkout 
      cart={cart}
      order={order}
      onCaptureCheckout={handleCaptureCheckout}
      error={errorMessage}/>} />
      </Routes>
      
    </div>
    
  )
}



export default App;
