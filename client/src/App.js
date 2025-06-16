import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AppBar from "./components/AppBar"
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';
import Container from '@mui/material/Container';
function App() {
  const initialform = {
    amount: 0,
    description: '',
    date: ''
  }
  const[form, setForm] = useState(initialform);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    fetchTransaction();
  },[]);
  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transactions");
    const {data} = await res.json();
    setTransaction(data);
  }
  function handleInput (e){
    console.log("Input changed:", e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  return (
    <Container>
    <AppBar/>
    <TransactionForm fetchTransaction={fetchTransaction}/>
    <TransactionsList transactions = {transaction} fetchTransaction={fetchTransaction} />
    </Container>
  );
}

export default App;
