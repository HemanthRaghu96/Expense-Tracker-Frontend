import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";

export const ExpenseForm = () => {
  // Predefined list of categories for the expense
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

  // State variables to manage form inputs and expense data
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(listOfCategories);
  const [category, setCategory] = useState(categories[0]);
  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  // Fetches all expenses when the component mounts
  useEffect(() => {
    getAllExpenses();
  }, []);

  // Function to get all expenses from the API
  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${api}/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  // Handles the form submission to add a new expense
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const newExpense = { amount, category, date, description };
    try {
      const response = await axios.post(`${api}/expenses`, newExpense);
      // Adds the new expense to the list of expenses and resets form fields
      setExpenses([...expenses, response.data]);
      setAmount("");
      setCategory(categories[0]);
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  // Optionally, handles the addition of an expense (not used in the form submission)
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
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl font-bold">Add Expense</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-lg shadow-md mt-3"
      >
        {/* Input for the expense amount */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 bg-white">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border bg-white border-gray-300 rounded mt-1"  
          />
        </div>

        {/* Dropdown to select the expense category */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 bg-white">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300  bg-white rounded mt-1"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white ">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Input for the expense date */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 bg-white">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
          />
        </div>

        {/* Text area for the expense description */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 bg-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
          />
        </div>

        {/* Submit button to add the expense */}
        <button
          type="submit"
          className="mx-3 font-bold  mr-32 bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};
