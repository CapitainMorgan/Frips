import React from 'react'

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutComponent from './CheckOutComponent';

const PUBLIC_KEY = "pk_test_51KZuuOJdwWFTddizjmbjlnq1BToKGR0IPNfZwMvh4CKjanVwHY9uVQSerbTons0G6IeB4cdX4IoPFXt8QkChRvEK00ZzjMJEsC"
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
        <CheckOutComponent />
    </Elements>
  )
}

export default StripeContainer