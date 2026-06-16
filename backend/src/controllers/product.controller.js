import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
    try {
        const { title, description, price } = req.body;
        const seller = req.user._id;

        const images = await Promise.all(req.files.map(async (file) => {
            const result = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
                folder: "snitch"
            });
            return result.url;
        }));

        const product = await productModel.create({
            title,
            description,
            price: { 
                amount: price,
                currency: "INR"
            },
            images,
            seller: seller._id
        });

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}