// require('dotenv').config()
// const express = require('express')
// const app = express()

// app.use(express.json())
// app.use(express.static("public"))
// const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY);   //const stripe = require('stripe')(SK);


// const storeItems = new Map([
//     [1, { priceInCents: 10000, name: "Learn React Today" }],
//     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
//   ])
  
//   app.post("/create-checkout-session", async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id)
//           return {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: storeItem.name,
//               },
//               unit_amount: storeItem.priceInCents,
//             },
//             quantity: item.quantity,
//           }
//         }),
//         // success_url: `${process.env.CLIENT_URL}/success.html`,
//         // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//       })
//       res.json({ url: session.url })
//     } catch (e) {
//       res.status(500).json({ error: e.message })
//     }
//   })

// app.listen(3000);

///////////////////functional//////////////////////////////
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const PK = "pk_test_51LxHexDte41dLHinwMjyrWV7fvq0hlLpBXMFLUrJPoAGaC8znUgsEYFeJtomtTr2uUqAA4B757RYFhvKKQA5KcBe00ilAzSQ7i"
// const SK = "sk_test_51LxHexDte41dLHinspvBfktxWH9CZLk7ntJxPtLxtmzPwiH55s4t3G6zGTK0ENIIt1LX7acmLjNp47nnHMjj513W00WdmGz2aO"
// //sk_test_51LxHexDte41dLHinspvBfktxWH9CZLk7ntJxPtLxtmzPwiH55s4t3G6zGTK0ENIIt1LX7acmLjNp47nnHMjj513W00WdmGz2aO

// const stripe = require('stripe')(SK);
// const app = express();

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// app.set("view engine", "ejs");


// const PORT = process.env.PORT || 3000;

// app.get('/', (req,res)=>{
//     res.render('Home', {
//         key: PK
//     });

// })

///////////////funtional//////////////////////////
//app.put()
//or review app.post methods


//////////////////functional/////////////////////////////////
// app.post('/checkout',(res)=>{
//   res.send()
//     stripe.customers.create({
//         //email:req.body.stripeEmail,
//         //source: req.body.stripeToken, //accesstoken info is taken from here
//         name:'Michael Kyle',
//         address:{
//             line1: '4321 Major Payne',
//             postal_code: '06381',
//             city: 'Stamford',
//             state: 'Connecticut'
//         },
//         //timestamps: true
//     })
//     .then((customer)=> {
//         return stripe.charges.create({
//             amount:7000, //converting from rupees to USD
//             description: 'Web Development Product',
//             currency:'USD',
//             customer: customer.id //pointing to id of customer which was passed
//         })
//     })
//     .then((charge)=>{
//         console.log(charge);
//         res.send("Confirmation! Successful Payment!");
//         //res.send(stripe.customer.id, stripe.customer.billing_details.name)
//     })
//     .catch((err)=>{
//         res.send(err);
//     })

// })

// app.listen(PORT, ()=>{
//     console.log(`App is listening on ${PORT}`);
// });
////////////////////functional//////////////////////////////


//done





