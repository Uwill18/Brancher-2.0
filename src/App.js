import './App.css';
import React, {useState,useEffect} from 'react'
 import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/commerce'

//import {Products, Navbar} from './components';



const App = () => {

  /**used statedful variables and effects to update the arrary for products */
  const[products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const [data] = await commerce.products.list();
    setProducts(data);
  }

  useEffect(()=> {
  fetchProducts();
  },[]);

  return (
    <div>
    <Navbar/>
    <Products/>
    </div>
  )
}



export default App;
