import express from 'express';
const PORT = 4000;
import connect from './database/mongodb.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionsApi from './routes/TransactionsApi.js'



const app = express();
app.use(cors());
app.use(bodyParser.json());

await connect();


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/transaction', TransactionsApi)


app.listen(PORT, () => {
  console.log('Server is running at http://localhost:4000');
})