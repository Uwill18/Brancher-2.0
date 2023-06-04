import React, {useState, useEffect} from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom'; //https://bobbyhadz.com/blog/react-export-usehistory-was-not-found-in-react-router-dom#:~:text=In%20version%206%20of%20react,%22%2Fabout%22%3E%20component.


const steps = ['Shipping address', 'Payment Details'];
const Checkout = ({cart, order, onCaptureCheckout,error}) => {
  const[activeStep,setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useNavigate();
  const nextStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep+1);
 const backStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep-1);


useEffect(() => {
  if (cart.id) {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        console.log(token.id);
        setCheckoutToken(token);
        console.log(token.id);
      } catch {
        if (activeStep !== steps.length) history.push('/');
      }
    };

    generateToken();
  }
}, [cart]);

const test = (data) => {
  setShippingData(data);

  nextStep();
};




let Confirmation = () => (order.customer ? (
  <>
    <div>
      <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
      <Divider className={classes.divider} />
      <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
    </div>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
  </>
) : (
  <div className={classes.spinner}>
    <CircularProgress />
  </div>
));

if (error) {
 Confirmation = () => (
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  );
}

  
  
 
  
const Form = () => (activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
  : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);
 
 
  return (
    <>
    <CssBaseline />
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
        
         {/* stepper is a component that moves as you go through the steps   */}
        <Stepper activeStep={activeStep} className={classes.stepper}>
                   {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
      </Paper>
    </main>
    </>
  );
}

export default Checkout;