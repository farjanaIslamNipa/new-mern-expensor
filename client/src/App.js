import {useEffect, useState} from 'react';

function App() {
  const [form, setForm] = useState(
    {
      amount:0,
      description:'',
      date:''
    }
  );

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchTransactions()
  },[transactions]);

  async function fetchTransactions(){
    const res = await fetch('http://localhost:4000/transaction')
    const data = await res.json();
    setTransactions(data.data);
    console.log(data.data)
  }
          
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers:{
        'content-type': 'application/json'
      }
    });
    const data = await res.json()
    console.log(data, 'response')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="amount" value={form.amount} type="number" onChange={handleChange} placeholder="Enter transaction amount" />
        <input name='description' value={form.description} type="text" onChange={handleChange} placeholder="Enter transaction details" />
        <input name='date' type="date" value={form.date} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      <hr />
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
