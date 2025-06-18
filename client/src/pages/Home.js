import React from 'react'
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
export default function Home() {
    const [transaction, setTransaction] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    useEffect(() => {
        fetchTransaction();
      }, []);

      async function fetchTransaction() {
        const res = await fetch("http://localhost:4000/transactions");
        const { data } = await res.json();
        setTransaction(data);
      }
    
      const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
      };
      
  return <Container>
  <TransactionForm
    fetchTransaction={fetchTransaction}
    editTransaction={editTransaction}
    setEditTransaction={setEditTransaction}
  />
  <TransactionsList
    transactions={transaction}
    fetchTransaction={fetchTransaction}
    setEditTransaction={setEditTransaction}
    showSnackbar={showSnackbar}
  />
  <Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      severity={snackbar.severity}
      sx={{ width: '100%' }}
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
</Container>
}
