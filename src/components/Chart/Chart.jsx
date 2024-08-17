import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = ({ expenses }) => {
  // Define a set of light colors
  const lightColors = [
    '#FFB3B3', // Light red
    '#FFEB99', // Light yellow
    '#B3E5FC', // Light blue
    '#C5E1A5', // Light green
    '#F8BBD0', // Light pink
    '#E0E0E0', // Light gray
    '#FFE082', // Light orange
  ];

  // Extract unique categories
  const categories = [...new Set(expenses.map(expense => expense.category))];
  
  // Prepare data for chart
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category =>
          expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        ),
        backgroundColor: categories.map((_, index) => lightColors[index % lightColors.length]),
        hoverBackgroundColor: categories.map((_, index) => lightColors[index % lightColors.length]),
      },
    ],
  };

  return (
    <div className="mt-4 flex flex-col justify-center items-center" style={{ width: '400px', height: '400px' }}>
      <h2 className="text-xl font-bold mb-2">Expense Chart</h2>
      <Pie data={data} />
    </div>
  );
};
