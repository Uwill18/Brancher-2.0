import React from 'react';
import { AppBar,Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
//import { AppBar,Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/leaf_nuevo.png';
import useStyles from './styles';
import {BrowserRouter as Router,Routes, Link} from 'react-router-dom';
import SubHeader from '../SubHeader';



//
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
 


  <Router>
  return (
    <>
    
     <AppBar position="fixed" className={classes.appBar} color="inherit">
     <Toolbar>
     <Routes>
        <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            {/* logo will appear on the left */}
            <img src={logo} alt="Commerce.js" height="25px"  className={classes.image}/>
          Brancher
        </Typography>
        </Routes>
        {/* classes.grow gives the navbar responsiveness to grow or shrink accordingly */}
        <div className={classes.grow}/>
        



          <div className={classes.button}>
           <Routes>
          <IconButton component={Link} to="/Cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
              <ShoppingCart/>
          </Badge> 
          </IconButton>
          </Routes>
      </div> 
      
        
     </Toolbar>
     </AppBar>
     <SubHeader/>
    </>
  )
  </Router>
}

export default Navbar;