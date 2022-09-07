import './App.css';
import React, {useState,useEffect} from 'react'
 import Products from './components/Products/Products';
// import Product from './components/Products/Product/Product';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/commerce'

//import {Products, Navbar} from './components';



const App = () => {

  /**used stateful variables and effects to update the arrary for products */
  const[products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }
//hook starts as empty on render

  useEffect(()=> {
  fetchProducts();
  },[]);
  console.log(products);

  return (
    <div>
    <Navbar/>
    <Products products={products}/>
    </div>
  )
}



export default App;
