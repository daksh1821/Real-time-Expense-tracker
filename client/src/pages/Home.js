import React from 'react'
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import Cookies from 'js-cookie';
import TransactionChart from '../components/TransactionChart';
import useSEO from '../utils/useSEO';

export default function Home() {
    const [transaction, setTransaction] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // SEO Meta Tags
    useSEO({
      title: 'Dashboard - Expenser | Track Your Expenses in Real-Time',
      description: 'Manage your expenses with Expenser dashboard. View interactive charts, add transactions, track spending patterns, and analyze your budget with beautiful visualizations.',
      keywords: 'expense dashboard, budget tracker, expense management, financial analytics, spending tracker, transaction history, expense charts',
      ogTitle: 'Expenser Dashboard - Real-Time Expense Tracking',
      ogDescription: 'Track and manage your expenses with beautiful charts and analytics. View your spending patterns and budget insights.',
      ogImage: 'https://expense-tracker-frontend-hw82.onrender.com/og-image.jpg',
      twitterTitle: 'Expenser Dashboard - Real-Time Expense Tracking',
      twitterDescription: 'Manage expenses with beautiful charts and real-time analytics.',
      twitterImage: 'https://expense-tracker-frontend-hw82.onrender.com/twitter-card.jpg',
      canonical: 'https://expense-tracker-frontend-hw82.onrender.com/'
    });

    useEffect(() => {
        fetchTransaction();
      }, []);

      async function fetchTransaction() {
        const token = Cookies.get("token");
        console.log("token being sent:", token); 
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        if (!res.ok) {
          try {
            const text = await res.text();
            showSnackbar(text || "Unauthorized", "error");
          } catch (e) {
            showSnackbar("Error fetching transactions", "error");
          }
          return;
        }
      
        const { data } = await res.json();
        setTransaction(data);
      }
      
      const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
      };

  return <Container>
    <TransactionChart data={transaction}/>
  <TransactionForm
    fetchTransaction={fetchTransaction}
    editTransaction={editTransaction}
    setEditTransaction={setEditTransaction}
  />
  <TransactionsList
    data={transaction}
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
