import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useState, useEffect} from 'react';
import dayjs from 'dayjs';

const initialForm = {
  amount:0,
  description:'',
  date: new Date()
}

export default function TransactionForm({editTransaction}) {
  const [form, setForm] = useState(initialForm);
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

  useEffect(() => {
    if(editTransaction !== {}){
      setForm(editTransaction)
    }
    console.log(editTransaction)
  }, [editTransaction])
  

  const handleDate = (newValue) => {
    setForm({...form,date:newValue})
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
    const data = await res.json();
    setForm(initialForm);
    console.log(data, 'response')
  }
  return (
    <Card sx={{ minWidth: 275, marginTop:5 }}>
      <CardContent>
        <Typography variant="h6">Add Transaction</Typography>
        <form  onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <TextField 
            value={form.amount} 
            onChange={handleChange} 
            id="outlined-basic" 
            label="Amount" 
            name="amount"
            variant="outlined" 
            size='small' 
            sx={{ marginRight:4 }} />
            <TextField 
            value={form.description} 
            onChange={handleChange} 
            id="outlined-basic" 
            label="Description"
            name="description" 
            variant="outlined" 
            size='small' 
            sx={{ marginRight:4 }} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                value={form.date}
                onChange={handleDate}
                renderInput={(params) => <TextField size='small' sx={{ marginRight:4 }} {...params} />}
              />
            </LocalizationProvider>
            {
              editTransaction !== {} && <Button type="submit" variant="contained" color="success">Update</Button>
            }
            {
              editTransaction === {} && <Button type="submit" variant="contained">Submit</Button>
            }
        
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
}
