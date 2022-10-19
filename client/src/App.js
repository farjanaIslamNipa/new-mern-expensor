import { Container } from '@mui/system';
import {useEffect, useState} from 'react';
import AppBar from './components/AppBar.js';
import TransactionForm from './components/TransactionForm.js';
import TransactionList from './components/TransactionList.js';

function App() {


  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions()
  },[transactions]);

  async function fetchTransactions(){
    const res = await fetch('http://localhost:4000/transaction')
    const data = await res.json();
    setTransactions(data.data);
  }
          

  return (
    <div>
      <AppBar />
      <Container>
      <TransactionForm editTransaction={editTransaction} />
      <TransactionList transactions={transactions} setEditTransaction={setEditTransaction} />
      </Container>
    </div>
  );
}

export default App;
