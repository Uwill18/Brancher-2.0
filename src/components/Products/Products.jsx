import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

//array of objects
const products = [
    {id: 1, name:'Shoes', description: 'Running shoes',price:'$5', image:'https://assets.vogue.com/photos/6216806693122fd329921153/master/w_1280%2Cc_limit/slide_21.jpg'},
    {id: 2, name:'Macbook', description: 'Apple macbook',price:'$10', image:'https://m.media-amazon.com/images/I/71gD8WdSlaL._AC_SL1500_.jpg'}
]


const Products = () => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing={4}
        >
            {/* mapping function maps to a callback funcgtion, and loops through the items
            of the products array to create a new list displayed to the application */}
         {products.map((product)=>(
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product}/>
            </Grid>
         ))}
        </Grid>
    </main>
    );

}

export default Products;