import {useEffect, useState} from 'react';
import AppBar from './components/AppBar.js';
import TransactionForm from './components/TransactionForm.js';

function App() {


  const [transactions, setTransactions] = useState([])

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
      <TransactionForm />
      <table>
        <tbody>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
          {
            transactions.map((trx) => (
              <tr key={trx.id}>
            <td>{trx.amount}</td>
            <td>{trx.description}</td>
            <td>{trx.date}</td>
          </tr>
            ))
          }
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
