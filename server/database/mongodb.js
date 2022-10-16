
import mongoose from 'mongoose';


async function connect(){
  await mongoose.connect('mongodb+srv://farjana:Mahveernawshad1@mern-expensor.mjidtyo.mongodb.net/?retryWrites=true&w=majority');
  console.log('mongodb connected');
}

export default connect;
