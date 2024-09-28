import { TEAC } from "../models/teacherM.js";

 export const createProduct = async (req, res) => {
    const { name, price, accountNo } = req.body;

    try {
        const product = new TEAC({ name, price, accountNo });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  const getProducts = async (req, res) => {
    try {
        const products = await TEAC.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
