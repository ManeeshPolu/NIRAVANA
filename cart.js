const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  


router.post("/cart", alreadyLoggedIn, async (req, res) => {
  try {
    const obj = {
        "userId" : req.user._id.toString(),
        "items" : req.body
    }
    console.log("cart body", obj);
    const newCart = await Cart.create(obj);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// router.get("/cart", alreadyLoggedIn, async (req, res) => {
//   try {

//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.get("/cart", alreadyLoggedIn, async (req, res) => {
  try {
    console.log("requser", req.user);
    const cart = await Cart.findOne({ userId: req.user._id.toString()});
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/cart", async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ userId: req.user._id.toString() });
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
