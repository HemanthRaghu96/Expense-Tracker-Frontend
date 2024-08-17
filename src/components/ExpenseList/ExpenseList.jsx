import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import { Chart } from "../Chart/Chart";

export default function ExpenseList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalBalance, setTotalBalance] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const [categoryTotals, setCategoryTotals] = useState({});

  // Fixed color options for categories
  const categoryColors = {
    Food: 'bg-blue-200',
    Transport: 'bg-green-200',
    Entertainment: 'bg-yellow-200',
    Utilities: 'bg-red-200',
    Others: 'bg-purple-200',
    Health:'bg-pink-200',
    Groceries:'bg-teal-200',
    Shopping:'bg-indigo-200'
    // Add more categories and their colors here
  };

  // Category image mapping with internet URLs
  const categoryImages = {
    Food: 'https://cdn-icons-png.flaticon.com/512/5235/5235253.png',
    Transport: 'data:image/png;base64,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',
    Entertainment: 'data:image/png;base64,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',
    Utilities: 'data:image/png;base64,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',
    Health: 'https://example.com/health-icon.png',
    Groceries:'https://cdn-icons-png.flaticon.com/512/1261/1261163.png',
    Shopping:'data:image/png;base64,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'
    
    // Add more categories and their images here
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [data, selectedMonth, selectedYear]);

  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${api}/expenses`);
      setData(response.data);
      calculateTotalBalance(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const filterExpenses = () => {
    const filtered = data.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    });
    setFilteredData(filtered);
    calculateTotalBalance(filtered);
    calculateCategoryTotals(filtered);
  };

  const calculateTotalBalance = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotalBalance(total);
  };

  const calculateCategoryTotals = (expenses) => {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
    setCategoryTotals(totals);
  };

  // Create an array of month options
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  // Generate an array of years from 2020 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

  return (
    <div className="mt-4 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">₹{totalBalance}</h1>
        <h2 className="font-semibold text-gray-500 text-xl md:text-2xl lg:text-3xl">Total Balance</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="px-4 py-2 border rounded-2xl bg-gray-200 text-sm sm:text-base"
        >
          {months.map((month, index) => (
            <option key={index} value={index} className='bg-gray-200'>{month}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-4 py-2 border rounded-2xl bg-gray-200 text-sm sm:text-base"
        >
          {years.map(year => (
            <option key={year} value={year} className='bg-gray-200'>{year}</option>
          ))}
        </select>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-4xl ">
        {Object.keys(categoryTotals).map(category => (
          <div 
            key={category} 
            className={`mt-2 rounded-2xl ${categoryColors[category] || 'bg-gray-200'} flex flex-col justify-center items-center h-[150px] w-[170px] p-4`}
          >
            <img
              src={categoryImages[category]}
              alt={category}
              className="w-12 h-12 mb-2 rounded-full object-contain"
            />
            <h3 className="font-bold text-xl bg-transparent">{category}</h3>
            <p className="text-gray-600 bg-transparent">₹{categoryTotals[category].toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-5">
        <Chart expenses={filteredData} />
      </div>
    </div>  
  );
}
