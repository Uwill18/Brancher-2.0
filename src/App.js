import './App.css';
import React, {useState,useEffect} from 'react'
import Products from './components/Products/Products';
//import Product from './components/Products/Product/Product';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/commerce'
import Cart from './components/Cart/Cart';
import { Routes, Route } from 'react-router-dom';

//import {Products, Navbar} from './components';



const App = () => {

  /**used stateful variables and effects to update the arrary for products */
  const[products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () =>{
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) =>{
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }
//hook starts as empty on render

  useEffect(()=> {
  fetchProducts();
  fetchCart();
  },[]);
 // console.log(products);
  //console.log(cart);

  return (
   
    <div>
      {/* may wrap an error boundary around navbar per console:
       https://reactjs.org/docs/error-boundaries.html*/}
    
   
   <Navbar totalItems={cart.total_items}/>
    <Routes>
      <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>} />
      <Route path='/cart' element={<Cart cart={cart}/>} />
      </Routes>
      
    </div>
    
  )
}



export default App;
