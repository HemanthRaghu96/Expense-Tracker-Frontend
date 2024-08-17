import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";

export const ExpenseForm = () => {
  const listOfCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Groceries",
    "Shopping",
    "Others",
  ];
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(listOfCategories);
  const [category, setCategory] = useState(categories[0]);
  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getAllExpenses();
  }, []);

  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${api}/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount, category, date, description };
    try {
      const response = await axios.post(`${api}/expenses`, newExpense);
      setExpenses([...expenses, response.data]);
      setAmount("");
      setCategory(categories[0]);
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const handleAddedExpense = async () => {
    const newExpense = { amount, category, date, description };
    try {
      const response = await axios.post(`${api}/expenses`, newExpense);
      console.log("Expense added successfully:", response.data);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <>
    
      <div className="flex flex-col justify-center items-center mt-32">
      <h1 className="text-2xl font-bold">Add Expense</h1>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-lg shadow-md mt-3"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
};
