const express = require("express");
const router = express.Router();
const Item = require("../models/item");

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  


router.post("/items",alreadyLoggedIn, async (req, res) => {
  try {
     
    const newItem = await Item.create(req.body);
    console.log("enter");
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/items", alreadyLoggedIn, async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/items/:itemId", alreadyLoggedIn ,async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/items/:itemId", alreadyLoggedIn,  async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
