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


export default function TransactionList({transactions}) {
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
                key={transaction.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component="th" scope="row">
                  {transaction.amount}
                </TableCell>
                <TableCell align='center'>{transaction.description}</TableCell>
                <TableCell align="center">{transaction.date}</TableCell>
                <TableCell align="center">
                <IconButton aria-label="edit">
                  <EditTwoToneIcon color='primary' />
                </IconButton>
                <IconButton aria-label="delete">
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
