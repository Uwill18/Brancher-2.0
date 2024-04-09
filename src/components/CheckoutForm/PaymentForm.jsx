import React, {useState} from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer,useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);




const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, timeout }) => {
 
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
 
 
 
 
 
 
 
 
 
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: elements.getElement(CardElement) });

    if(!error){
      try{
        const {id} = paymentMethod
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 10000,
          id
        })
        if(response.data.success){
          console.log("Successful payment")
          setSuccess(true)
        }
      }catch(error){
        console.log("Error", error)
      }
    } else{
      console.log(error.message)
    }





    // if (error) {
    //   console.log('[error]', error);
    // } else {
    //   const orderData = {
    //     line_items: checkoutToken.line_items,
    //     customer: { 
    //       //id: shippingData.phone,
    //       firstname: shippingData.firstName, 
    //       lastname: shippingData.lastName, 
    //       email: shippingData.email },
    //     shipping: { 
    //     name: 'Primary', 
    //     street: shippingData.address1,
    //     town_city: shippingData.city,
    //     county_state: shippingData.shippingSubdivision, 
    //     postal_zip_code: shippingData.zip, 
    //     country: shippingData.shippingCountry },

    //     fulfillment: { shipping_method: shippingData.shippingOption },
    //     payment: {
    //       gateway: 'stripe',
    //       stripe: {
    //         payment_method_id: paymentMethod.id,
    //       },
    //     },
    //   };
    //   console.log(orderData);
    //   onCaptureCheckout(checkoutToken.id, orderData);
    //   timeout();
    //   console.log(orderData);
    //   nextStep();
    //   console.log(orderData);
    // }
  };

  return (
    <>

<Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
          {!success ? <form onSubmit={(e) => handleSubmit(e, elements, stripe)}
           action="checkout"
           method="POST">

            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit"
               variant="contained" 
               disabled={!stripe} 
               color="primary">
                Pay 
                {checkoutToken.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form> : 
          <div>
            <Typography variant="h5">Thank you for your purchase! </Typography>
            </div>}


      </Elements>
    </>
  );
};

export default PaymentForm;