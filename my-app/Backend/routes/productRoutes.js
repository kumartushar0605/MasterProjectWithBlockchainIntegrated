import express from "express"


import {createProduct, getProducts } from '../controllers/productController.js';
import { TEAC } from "../models/teacherM.js";
  const routerrrr = express.Router();

routerrrr.route('/').post(createProduct).get(getProducts);

routerrrr.get('/:id', async (req, res) => {
    try {
        const product = await TEAC.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        res.status(500).send(`Error fetching product: ${err.message}`);
    }
});

export default routerrrr;

