import { Container } from '@mui/system';
import {useEffect, useState} from 'react';
import TransactionForm from '../components/TransactionForm.js';
import TransactionList from '../components/TransactionList.js';

function Home() {


  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions()
  },[]);

  async function fetchTransactions(){
    const res = await fetch('http://localhost:4000/transaction')
    const data = await res.json();
    setTransactions(data.data);
  }
          

  return (
    <div>
      <Container>
      <TransactionForm fetchTransactions={fetchTransactions()} editTransaction={editTransaction} />
      <TransactionList fetchTransactions={fetchTransactions()} transactions={transactions} setEditTransaction={setEditTransaction} />
      </Container>
    </div>
  );
}

export default Home;
