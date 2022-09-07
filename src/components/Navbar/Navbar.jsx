import React from 'react';
import { AppBar,Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
//import { AppBar,Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/leaf_nuevo.png';
import useStyles from './styles';



const Navbar = () => {
  const classes = useStyles();

  return (
    <>
     <AppBar position="fixed" className={classes.appBar} color="inherit">
     <Toolbar>
        <Typography variant="h6" className={classes.title} color="inherit">
            {/* logo will appear on the left */}
            <img src={logo} alt="Commerce.js" height="25px"  className={classes.image}/>
          Brancher
        </Typography>
        {/* classes.grow gives the navbar responsiveness to grow or shrink accordingly */}
        <div className={classes.grow}/>
        <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit"></IconButton>
            <Badge badgeContent={2} color="secondary">
                <ShoppingCart/>
            </Badge> 
        </div>
     </Toolbar>
     </AppBar>
    </>
  )
}

export default Navbar