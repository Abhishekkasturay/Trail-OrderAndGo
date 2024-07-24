const express = require("express");
const router = express.Router();
const Train = require("../models/Train");

// Get all trains or filter by from and to station codes
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    let trains;
    if (from && to) {
      trains = await Train.find({
        fromStnCode: from.toUpperCase(),
        toStnCode: to.toUpperCase(),
      });
    } else {
      trains = await Train.find();
    }
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single train by ID
router.get("/:id", async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (train) {
      res.json(train);
    } else {
      res.status(404).json({ message: "Train not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new train
router.post("/", async (req, res) => {
  const train = new Train(req.body);
  try {
    const newTrain = await train.save();
    res.status(201).json(newTrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing train
router.put("/:id", async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (train) {
      Object.assign(train, req.body);
      const updatedTrain = await train.save();
      res.json(updatedTrain);
    } else {
      res.status(404).json({ message: "Train not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a train
router.delete("/:id", async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (train) {
      await train.remove();
      res.json({ message: "Train deleted" });
    } else {
      res.status(404).json({ message: "Train not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
