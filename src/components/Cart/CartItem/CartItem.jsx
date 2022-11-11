import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item , onUpdateCartQty, onRemoveFromCart}) => {
    const classes= useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
  console.log(item);
  return (
    <Card className="cart-item">
      {/* <CardMedia image={item.image.source} alt={item.name} className={classes.image} /> */}
      <CardMedia className={classes.media} image={item.image.url}/>
        <CardContent>
        <div className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </div>
        </CardContent>
        <CardActions className={classes.CardActions}>
             <div className={classes.buttons}>
              <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}> - </Button>
              <Typography>{item.quantity}</Typography>
              <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}> + </Button>
             </div>
             <Button variant="contained" type="button" color="secondary"  onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
    
  )
  
}


export default CartItem