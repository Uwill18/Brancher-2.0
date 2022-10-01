import React from 'react'
import {Paper,Stepper,Step,StepLabel, Typography,CircularProgress,Divider, Button} from '@material-ui/core';
import { ClassNames } from '@emotion/react';

const steps = ['Shipping address', 'Payment Details']


const Checkout = () => {
  return (
    <>
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
         {/* stepper is a component that moves as you go through the steps   */}
        <Stepper activeStep={0} className={classes.stepper}></Stepper>
      </Paper>
    </main>
    </>
  )
}

export default Checkout