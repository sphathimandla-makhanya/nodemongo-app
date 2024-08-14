// controllers/orderController.js
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { sendMail } from '../utils/mailer.js';

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let cartContent = 'Your order:\n\n';
    cart.items.forEach(item => {
      cartContent += `Product: ${item.product.name}\nQuantity: ${item.quantity}\n\n`;
    });

    const userEmail = req.user.email;
    const supplierEmail = 'makhanyasm11@gmail.com'; // Replace with the supplier's email

    await sendMail(userEmail, 'Order Confirmation', cartContent);
    await sendMail(supplierEmail, 'New Order Placed', cartContent);

    // Clear the cart after placing the order
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Order placed and emails sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
