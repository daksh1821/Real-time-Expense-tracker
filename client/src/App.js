import { useState } from 'react';
function App() {
  const[form, setForm] = useState({
    amount: 0,
    description: '',
    date: ''
  });
  function handleInput (e){
    console.log("Input changed:", e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  async function handleSubmit (e) {
    e.preventDefault();
    const res = await fetch("hhtp://localhost:4000/transaction",{
      method: "POST",
      body: form,
    });
    console.log(res);
  }
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" value={form.amount.value} onChange={handleInput} placeholder="Enter transaction amount" />
        <input type="text" name="description" value={form.description.value} onChange={handleInput} placeholder="Enter transaction description" /> 
        <input type = "date" value={form.date.value} onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
