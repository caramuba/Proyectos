import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image } = req.body;
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Faltan campos obligatorios (name, price, stock)",
      });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted) {
      return res.status(404).json({ message: "Pproducto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};
