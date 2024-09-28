import express from "express"

import {processPayment} from'../controllers/paymentController.js';
const routerrr = express.Router();

routerrr.route('/').post(processPayment);

export default routerrr;
