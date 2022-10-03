import express from 'express';
const PORT = 4000;
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(cors());

await mongoose.connect('mongodb+srv://farjana:Mahveernawshad1@mern-expensor.mjidtyo.mongodb.net/?retryWrites=true&w=majority');
console.log('mongodb connected');

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, ()=>{
  console.log('Server is running at http://localhost:4000');
})