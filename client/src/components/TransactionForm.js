import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSelector } from 'react-redux';

export default function TransactionForm({ fetchTransaction, editTransaction, setEditTransaction }) {
  const token = Cookies.get('token');
  const initialform = {
    amount: '',
    description: '',
    date: dayjs(),
  };

  const [form, setForm] = useState(initialform);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (Object.keys(editTransaction || {}).length !== 0) {
      setForm({
        ...editTransaction,
        date: dayjs(editTransaction.date)
      });
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleDateChange = (newDate) => {
    if (!newDate || !dayjs(newDate).isValid()) return;
    setForm((prev) => ({
      ...prev,
      date: newDate
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const isEdit = Object.keys(editTransaction || {}).length !== 0;
    const url = isEdit
      ? `${process.env.REACT_APP_API_URL}/transactions/${editTransaction._id}`
      : `${process.env.REACT_APP_API_URL}/transactions`;
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        ...form,
        date: form.date.format("YYYY-MM-DD")
      }),
      headers: {
        "Content-Type": "application/json",
         Authorization : `Bearer ${token}`,
      }
    });

    if (res.ok) {
      setForm(initialform);
      setEditTransaction({});
      fetchTransaction();

      setSnackbar({
        open: true,
        message: isEdit ? "Transaction updated successfully!" : "Transaction added successfully!",
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        severity: 'error'
      });
    }
  }

  const handleCancelEdit = () => {
    setEditTransaction({});
    setForm(initialform);
  };

  const isEdit = Object.keys(editTransaction || {}).length !== 0;
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            {isEdit ? "Edit Transaction" : "Add New Transaction"}
          </Typography>

          <TextField
            sx={{ marginRight: 2, marginBottom: 2 }}
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />

          <TextField
            sx={{ marginRight: 2, marginBottom: 2 }}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={dayjs(form.date)}
              name="date"
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ marginRight: 5, marginBottom: 2 }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Button type="submit" sx={{ marginLeft: 4, marginRight:4, marginTop:5}} variant="contained">
            {isEdit ? "Update" : "Submit"}
          </Button>

          {isEdit && (
            <Button  onClick={handleCancelEdit} variant="contained" color="secondary">
              Cancel Edit
            </Button>
          )}
        </form>
      </CardContent>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
