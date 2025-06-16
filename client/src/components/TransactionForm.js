import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function TransactionForm({fetchTransaction}) {
  const initialform = {
    amount: '',
    description: '',
    date: dayjs()
  };

  const [form, setForm] = useState(initialform);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleDateChange = (newDate) => {
    setForm({
      ...form,
      date: newDate
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transactions", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        date: form.date.format("YYYY-MM-DD") // convert dayjs to string for backend
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      setForm(initialform);
      fetchTransaction(); // if needed
    }
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Add New Transaction
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
              value={form.date}
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
          <Button type="submit" sx={{marginLeft:5}}variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
