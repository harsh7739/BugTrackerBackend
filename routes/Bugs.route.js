const express = require('express');
const {BugsModel} = require("../models/Bugs.model")
const {auth} = require("../middelware/auth")
const bugsRoute = express.Router()

bugsRoute.get('/bugs', auth,async (req, res) => {
  try {
    const bugs = await BugsModel.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

bugsRoute.get('/bugs/:id',auth, async (req, res) => {
  const { id } = req.params;
  try {
    const bug = await BugsModel.findById(id);
    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new bug
bugsRoute.post('/bugs', auth, async (req, res) => {
    const { title, description, source, severity } = req.body;
  
    try {
      const newBug = await BugsModel.create({
        title,
        description,
        source,
        severity,
        raised_by: req.raised_by,
      });
      res.status(201).json(newBug);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// PUT/PATCH update bug by ID
bugsRoute.put('/bugs/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, source, severity } = req.body;

  try {
    const updatedBug = await BugsModel.findByIdAndUpdate(
      id,
      { title, description, source, severity, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedBug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE bug by ID
bugsRoute.delete('/bugs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBug = await BugsModel.findByIdAndDelete(id);
    if (!deletedBug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.json(deletedBug);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = {bugsRoute}