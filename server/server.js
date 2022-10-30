import express from 'express';
const PORT = 4000;
import connect from './database/mongodb.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionsApi from './routes/TransactionsApi.js'
import AuthApi from './routes/AuthApi.js';
import passport from 'passport';
import passportConfig  from './config/passport.js';
import * as dotenv from 'dotenv'



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
dotenv.config();

await connect();


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/transaction', TransactionsApi)
app.use('/auth', AuthApi)


app.listen(PORT, () => {
  console.log('Server is running at http://localhost:4000');
})