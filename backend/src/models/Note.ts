import mongoose from 'mongoose';

interface INote {
  _id: mongoose.ObjectId;
  title: string;
  content: string;
  owner?: string;
  isActive: boolean;
  createdAt: Date;
}

const noteSchema = new mongoose.Schema<INote>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  content: String,
  owner: String,
  isActive: Boolean,
  createdAt: { type: Date, required: true },
});

const Notes = mongoose.model('Notes', noteSchema);

export default Notes;
