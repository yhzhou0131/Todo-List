import axios from 'axios';
import mongoose from 'mongoose';

class NoteService {
  instance: any;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3000/notes',
    });
  }

  async getAllNotes() {
    const response = await this.instance.get('/getNotes');
    return response.data;
  }

  async getNoteById(id: mongoose.ObjectId) {
    const response = await this.instance.get(`/getNotes/${id}`);
    return response.data;
  }

  async addNote(obj: Record<string, any>) {
    const response = await this.instance
      .post('/addNotes', obj)
      .then((res: any) => {
        console.log('Sucessfully add the note.');
        return res.data;
      })
      .catch((err: any) => {
        console.error(err);
      });
    return response;
  }

  async updateNote(id: mongoose.ObjectId, update: Record<string, any>) {
    const response = await this.instance.patch(`/updateNotes/${id}`, update);
    return response.data;
  }

  async deleteNote(id: mongoose.ObjectId) {
    const response = await this.instance.delete(`/deleteNotes/${id}`, {
      _id: id,
    });
    return response.data;
  }
}

export default new NoteService();
