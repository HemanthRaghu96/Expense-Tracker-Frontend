import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { ExpenseList } from "./pages/ExpenseList/ExpenseList";
import { Account } from "./pages/Account/Account";
import { ExpenseForm } from "./components/ExpenseForm/ExpenseForm";
import UpdateExpenseForm from "./components/UpdateExpenseForm/UpdateExpenseForm";

function App() {
  return <>
  <BrowserRouter >
  <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expense-list" element={<ExpenseList />} />
      <Route path="/addexpense" element={<ExpenseForm/>} />
      <Route path="/expense-list/:id" element={<ExpenseForm/>} />
      <Route path="/expense-list/edit/:expenseId" element={<UpdateExpenseForm/>} />
      <Route path="/account" element={<Account />} />
    </Routes>
    </BrowserRouter>
  </>;
}

export default App;
