import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css';
import VirtualCard from './VirtualCard';
import { useLocation ,useNavigate} from 'react-router-dom';
import logo from '../Assests/CC.png';

function CheckoutForm({id,sec,email,_id,readyId}) {
    const navigate = useNavigate();
    const stripe = useStripe();
  const elements = useElements();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [highlightField, setHighlightField] = useState('');
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try{
        const response = await fetch(`http://localhost:5000/address/${email}`); // Adjust the URL to your backend
          const result = await response.json(); // Parse the response as JSON
          setProduct(result)
          
      }catch(error){
        console.log(error)
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setIsProcessing(false);
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      try {
        const paymentResponse = await axios.post('/api/payment', {
          productId: id,
          paymentMethodId: paymentMethod.id
        });
        
        console.log('Payment Response:', paymentResponse.data);
        updatePayment();
        deletee();
        navigate("/meet",{state:{sec}})
        // Handle successful payment response
      } catch (error) {
        setError('Payment failed. Please try again.');
        console.error('Error processing payment:', error);
      }
    }
    const deletee = async()=>{
        try {
          await fetch(`http://localhost:5000/delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email ,_id,readyId}),
          });
        } catch (error) {
          console.log(error);
        }
      }
    const updatePayment = async()=>{
        try {
          await fetch(`http://localhost:5000/pay/${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    setIsProcessing(false);
  };

  const handleCardChange = (event) => {
    if (event.complete) {
      setCardNumber(event.value);
      setHighlightField('number');
      setFlipCard(false);
    } else {
      setHighlightField('');
    }
  };

  const handleExpiryChange = (event) => {
    if (event.complete) {
      setExpiryDate(event.value);
      setHighlightField('expiry');
      setFlipCard(false);
    } else {
      setHighlightField('');
    }
  };

  const handleCvcChange = (event) => {
    if (event.complete) {
      setCvv(event.value);
      setHighlightField('cvc');
      setFlipCard(true);
    } else {
      setHighlightField('');
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="info-section">
          <img src={logo} alt="Company Logo" className="logo" />
          <h1>{product.name}</h1>
          <p className="price">Price: Rs {product.price}</p>
        </div>
        <div className="payment-section">
          <VirtualCard number={cardNumber} expiry={expiryDate} cvc={cvv} highlightField={highlightField} flipCard={flipCard} />
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="card-details">
              <div className="card-field">
                <label htmlFor="cardNumber">Card Number</label>
                <CardNumberElement
                  id="cardNumber"
                  onChange={handleCardChange}
                  options={{ 
                    style: { 
                      base: { 
                        fontSize: '16px', 
                        color: '#424770', 
                        '::placeholder': { 
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    } 
                  }} 
                />
              </div>
              <div className="card-details-row">
                <div className="card-field">
                  <label htmlFor="expiryDate">Expiration Date</label>
                  <CardExpiryElement
                    id="expiryDate"
                    onChange={handleExpiryChange}
                    options={{ 
                      style: { 
                        base: { 
                          fontSize: '16px', 
                          color: '#424770', 
                          '::placeholder': { 
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      } 
                    }} 
                  />
                </div>
                <div className="card-field">
                  <label htmlFor="cvc">CVV</label>
                  <CardCvcElement
                    id="cvc"
                    onChange={handleCvcChange}
                    options={{ 
                      style: { 
                        base: { 
                          fontSize: '16px', 
                          color: '#424770', 
                          '::placeholder': { 
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      } 
                    }} 
                  />
                </div>
              </div>
            </div>
            <button type="submit" disabled={!stripe || isProcessing} className="submit-button">
              {isProcessing ? "Processing…" : "Pay"}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
