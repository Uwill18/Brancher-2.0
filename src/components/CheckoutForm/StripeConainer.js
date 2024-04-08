import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_live_51LxHexDte41dLHind9P1F7fO3L1mYeIHrfYkgEih1LRjvdrsxmF0p8s0LFA6a6CaOYdO6kj9Fs9d1RX9MXFUfSZ500dUjqw19X"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}