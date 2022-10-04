import React, {useState} from 'react';
import {Paper,Stepper,Step,StepLabel, Typography} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment Details']
const Checkout = () => {
  const[activeStep,setActiveStep] = useState(1);
  const classes = useStyles();

  const Confirmation = () => (
      <div>
      Confirmation
    </div>
    );
  
  
 
  
  const Form = () => activeStep === 0 ? 
  <AddressForm/> : <PaymentForm/>
  
  return (
    <>
    <AddressForm></AddressForm>
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
         {/* stepper is a component that moves as you go through the steps   */}
        <Stepper activeStep={activeStep} className={classes.stepper}>
         {steps.map((step => 
            <Step key={step}>
                <StepLabel>{step}</StepLabel>
            </Step>))} 
            </Stepper>
            {activeStep === steps.length ? <Confirmation/> : <Form/>}
      </Paper>
    </main>
    <AddressForm/>
    </>
  )
}

export default Checkout;