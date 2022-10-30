import { Container } from '@mui/system';
import {useEffect, useState} from 'react';
import TransactionForm from '../components/TransactionForm.js';
import TransactionList from '../components/TransactionList.js';
import Cookies from "js-cookie";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions()
  },[]);

  async function fetchTransactions(){
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
