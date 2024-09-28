
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';
import { useLocation,useNavigate } from 'react-router-dom';


// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51Pn3sfHOkqIkITTDcQTV4C7zLcYRpPf45cRnmExIHrkmPMeu9rpkUlj40h6HQz61bbPAQZruuc5jWx2yPdrl6mSe00E9xU1EqT');

function CheckoutPage() {
  const location = useLocation();
  const { teacherID ,sec,email,_id,readyId} = location.state || '';
 console.log(email+"hibra")
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm id={teacherID} sec={sec} email ={email} _id={_id} readyId={readyId} />
    </Elements>
  );
}

export default CheckoutPage;


