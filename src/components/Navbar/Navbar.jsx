import React from 'react';
import { AppBar,Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
//import { AppBar,Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/leaf_nuevo.png';
import useStyles from './styles';
import { Link,useMatch, useResolvedPath} from 'react-router-dom';




//source for updated button navigation: https://www.youtube.com/watch?v=SLfhMt5OUPI&t=821s
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
 



function CustomLink({to, children, ...props}){
  const resolvedPath =useResolvedPath(to);
  const isActive = useMatch({path: resolvedPath.pathname, end: true});
  return(
    
    <ul className={isActive ? "active" : ""}>
      {/**https://bobbyhadz.com/blog/react-change-color-of-link */}
      <Link to={to} {...props} style={{textDecoration:'none', color:'black'}}>
        {children}
      </Link>
    </ul>
    
  )
}



  return (
    
    <>
    
     <AppBar position="fixed" className={classes.appBar} color="inherit">
     <Toolbar>
      
     
        <Typography variant="h6" className={classes.title} color="inherit">
            {/* logo will appear on the left */}
            <CustomLink to='/'>
            <img src={logo} alt="Commerce.js" height="25px"  className={classes.image}/>
            
          Brancher
          </CustomLink>
        </Typography>
        
        {/* classes.grow gives the navbar responsiveness to grow or shrink accordingly */}
        <div className={classes.grow}/>
        
        



          
        <CustomLink to='/cart'>
            <div className={classes.button}>
          <IconButton aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
              <ShoppingCart/>
          </Badge> 
          </IconButton>
          </div>
          </CustomLink>
          
     </Toolbar>
     </AppBar>
    
    </>
  );
  
}

export default Navbar;