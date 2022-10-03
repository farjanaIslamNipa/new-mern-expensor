import {useState} from 'react';

function App() {
  const [form, setForm] = useState(
                                    {
                                      amount:0,
                                      description:'',
                                      date:''
                                    }
                                  )
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: form,
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="amount" value={form.amount} type="number" onChange={handleChange} placeholder="Enter transaction amount" />
        <input name='description' value={form.description} type="text" onChange={handleChange} placeholder="Enter transaction details" />
        <input name='date' type="date" value={form.date} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
