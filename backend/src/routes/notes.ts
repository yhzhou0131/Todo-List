import express from 'express';
import Notes from '../models/Note';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/getNotes', async (_, res) => {
  try {
    const result = await Notes.find({});
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/getNotes/:id', async (req, res) => {
  try {
    const result = await Notes.findById(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/addNotes', async (req, res) => {
  try {
    const note = new Notes({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      content: req.body.content || '',
      owner: req.body.owner || '',
      isActive: req.body.isActive || true,
      createdAt: Date.now(),
    });

    const insertNote = await note.save();
    res.status(201).send(insertNote);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.patch('/updateNotes/:id', async (req, res) => {
  try {
    await Notes.findOneAndUpdate({ _id: req.params.id }, req.body);
    const updatedNote = await Notes.findOne({ _id: req.params.id });
    res.status(200).send(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.delete('/deleteNotes/:id', async (req, res) => {
  try {
    const note = await Notes.deleteOne({ _id: req.params.id });
    res.status(200).send(note);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

export default router;
