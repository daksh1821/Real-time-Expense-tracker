import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function TransactionsList({
  data = [], // ✅ default to empty array
  fetchTransaction,
  setEditTransaction,
  showSnackbar,
}) {
  const user = useSelector((state)=>state.auth.user)
  async function remove(_id) {
    console.log("Deleting transaction with ID:", _id); // debug line
    const token = Cookies.get('token');
    if (!window.confirm("Are you sure?")) return;
  
    if (!_id) {
      console.error("Transaction ID is undefined!");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(token)}`,
        },
      });
  
      if (res.ok) {
        fetchTransaction();
        showSnackbar("Transaction deleted successfully", "success");
      } else {
        showSnackbar("Failed to delete transaction", "error");
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      showSnackbar("An error occurred", "error");
    }
  }
  

  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="transactions table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {Array.isArray(data) && data.length > 0 ? (
    [...data]
      .sort((a, b) => new Date(a.month) - new Date(b.month)) // Sort months chronologically
      .map((month) =>
        [...month.transactions]
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort transactions within the month
          .map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.amount}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => setEditTransaction(row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="warning"
                  onClick={() => remove(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
      )
  ) : (
    <TableRow>
      <TableCell colSpan={4} align="center">
        No transactions found.
      </TableCell>
    </TableRow>
  )}
</TableBody>


        </Table>
      </TableContainer>
    </>
  );
}
