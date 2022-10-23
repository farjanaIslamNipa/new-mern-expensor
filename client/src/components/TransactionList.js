import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';


export default function TransactionList({transactions, setEditTransaction}) {
  const remove = async (_id) => {
    if(!window.confirm('Are you sure')) return;
    const res = await fetch(`http://localhost:4000/transaction/${_id}`, {
      method:'DELETE',

    });
    if(res.ok){
      window.alert('Deleted Successfully')
    }
  }
  const formatDate = (date) => {
    return dayjs(date).format('DD MMM YYYY')
  }
  return (
      <>
        <Typography sx={{marginTop:5, backgroundColor: 'white', paddingTop: 3, paddingLeft:3}} variant="h6">List of Transactions</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Amount</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component="th" scope="row">
                  {transaction.amount}
                </TableCell>
                <TableCell align='center'>{transaction.description}</TableCell>
                <TableCell align="center">{formatDate(transaction.date)}</TableCell>
                <TableCell align="center">
                <IconButton aria-label="edit">
                  <EditTwoToneIcon color='primary' onClick={() => setEditTransaction(transaction)} />
                </IconButton>
                  <IconButton aria-label="delete" onClick={() => remove(transaction._id)}>
                    <DeleteSweepTwoToneIcon color='secondary' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
}
