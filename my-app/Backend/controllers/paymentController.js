import { TEAC } from "../models/teacherM.js";
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Pn3sfHOkqIkITTD1fCuLMxzu5Eqq0T42N4GSB06abD3ImthoQa8unUsYSeAh9L1h0NMH3zgjvOf7Pv60T96DThH00LCaN3wiE");

export  const processPayment = async (req, res) => {
    const { productId, paymentMethodId } = req.body;

    try {
        const product = await TEAC.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100, // converting to cents
            currency: 'INR',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            product,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
