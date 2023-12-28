import mongoose from 'mongoose';
import express from 'express';
import notes from './routes/notes';
import cors from 'cors';
import 'dotenv/config';

const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(cors(corsOptions));

app.use('/notes', notes);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server listen at ${process.env.EXPRESS_PORT}.`);

  //CONNECTION TO MONGOOSE DATABASE
  mongoose
    .connect(process.env.MONGODB_CONN_STR || '')
    .then(() => {
      console.log('Connected to mongoDB.');
    })
    .catch((error) => {
      console.error(error);
    });
});
