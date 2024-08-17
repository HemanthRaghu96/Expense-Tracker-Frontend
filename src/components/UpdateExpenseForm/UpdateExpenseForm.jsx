import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
const UpdateExpenseForm = () => {
  // Extract expenseId from URL parameters
  const { expenseId } = useParams();

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
  const [category, setCategory] = useState(listOfCategories[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [categories] = useState(listOfCategories);
const navigate=useNavigate()
  // Fetch the expense data when the component mounts or the expenseId changes
  useEffect(() => {
    if (expenseId) {
      getExpenseById(expenseId);
    }
  }, [expenseId]);

  // Function to get an expense by ID from the API
  const getExpenseById = async (id) => {
  try {
    const response = await axios.get(`${api}/expenses/${id}`);
    const expense = response.data;
    
    // Convert ISO date to 'yyyy-MM-dd' format
    const formattedDate = new Date(expense.date).toISOString().split('T')[0];
    
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(formattedDate);
    setDescription(expense.description);
  } catch (error) {
    console.error("Failed to fetch expense:", error);
  }
};

  // Handles the form submission to update the expense
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const updatedExpense = { amount, category, date, description };
    try {
      await axios.put(`${api}/expenses/${expenseId}`, updatedExpense);
     navigate('/expense-list')
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl font-bold">Update Expense</h1>
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
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
          />
        </div>

        {/* Dropdown to select the expense category */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 bg-white">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white">
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

        {/* Submit button to update the expense */}
        <button
          type="submit"
          className="mx-3 font-bold bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default UpdateExpenseForm;
