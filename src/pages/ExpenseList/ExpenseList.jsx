import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const ExpenseList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    getAllExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [data, selectedMonth, selectedYear]);

  // Function to get all expenses from the API
  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${api}/expenses`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  // Function to filter expenses by selected month and year
  const filterExpenses = () => {
    const filtered = data.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() + 1 === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    });
    setFilteredData(filtered);
  };

  // Function to group expenses by category
  const groupByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = [];
      }
      acc[expense.category].push(expense);
      return acc;
    }, {});
  };

  // Group filtered expenses by category
  const groupedExpenses = groupByCategory(filteredData);

  // Handle month selection change
  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  // Handle year selection change
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  // Handle the navigation to add expense page
  const handleAddExpense = () => {
    navigate("/addexpense");
  };

  return (
    <div className="flex flex-col justify-center items-center mb-20">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Expense List by Category</h2>
          <div className="mt-3">
            {/* Month Selection Dropdown */}
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="px-4 py-2 border rounded-2xl bg-gray-200 text-sm sm:text-base mr-3"
            >
              {[...Array(12).keys()].map((month) => (
                <option
                  key={month + 1}
                  value={month + 1}
                  className="bg-gray-200"
                >
                  {new Date(0, month).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>

            {/* Year Selection Dropdown */}
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="px-4 py-2 border rounded-2xl bg-gray-200 text-sm sm:text-base"
            >
              {[...Array(10).keys()].map((i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year} className="bg-gray-200">
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="ml-10">
          {/* Button to navigate to add expense page */}
          <button
            className="mx-3 font-bold text-xl mr-32 bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Display grouped expenses by category */}
      {Object.keys(groupedExpenses).map((category) => (
        <div key={category}>
          <h3 className="text-2xl font-bold mt-5">{category}</h3>
          <table className="mt-2 w-[400px] ">
            <thead>
              <tr>
                <th className="text-left">Description</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {groupedExpenses[category].map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.description}</td>
                  <td>₹{expense.amount}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
