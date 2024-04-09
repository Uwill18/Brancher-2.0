const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY);
const app = express();
require('dotenv').config()
const cors = require("cors")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json)
app.use(cors)

app.post("/payment", cors(), async(req,res)=>{
    let {amount, id} = req.body
    try{
        const payment = await stripe.paymentIntents.create(
            {
                amount,
                currency: "USD",
                description: id.description,
                payment_method: id,
                confirm: true
            })
            console.log(payment)
            res.json({
                message: "Payment successful",
                success: true
            })
    }catch(error){
        console.log("Error ",error)
        res.json({
            message:"Payment failed",
            success: false
        })
    }

})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(  `Server is lisenting on port: ${PORT}` )
})

