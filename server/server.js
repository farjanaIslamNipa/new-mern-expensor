import express from 'express';
const PORT = 4000;
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Transaction from './models/transaction.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());

await mongoose.connect('mongodb+srv://farjana:Mahveernawshad1@mern-expensor.mjidtyo.mongodb.net/?retryWrites=true&w=majority');
console.log('mongodb connected');

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get('/transaction', async (req, res) => {
  const transaction = await Transaction.find({}).sort({createdAt: -1})
  res.json({data:transaction})
})
app.post("/transaction", async (req, res) => {
  const {amount, description, date} = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({message:"Success"});
});

app.listen(PORT, ()=>{
  console.log('Server is running at http://localhost:4000');
})