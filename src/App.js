import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Initial category budgets
  const [categories, setCategories] = useState([
    { name: 'Rent', budget: 2750, spent: 0 },
    { name: 'Groceries', budget: 300, spent: 0 },
    { name: 'Shopping', budget: 100, spent: 0 },
    { name: 'Dining', budget: 100, spent: 0 },
    { name: 'Utilities', budget: 225, spent: 0 },
    { name: 'Car', budget: 922, spent: 0 },
    { name: 'Savings', budget: 1000, spent: 0 },
    { name: 'Streaming', budget: 50, spent: 0 }
  ]);
  
  // Calculate total budget by summing all category budgets
  const totalBudget = categories.reduce((total, category) => total + category.budget, 0);
  
  const [spentTotal, setSpentTotal] = useState(0); // Total spent so far

  // Handle manual expense input
  const handleAddExpense = (categoryName, amount) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.name === categoryName
          ? { ...category, spent: category.spent + parseFloat(amount) }
          : category
      )
    );
    setSpentTotal(prevSpent => prevSpent + parseFloat(amount)); // Update total spent
  };

  // Handle category budget change
  const handleCategoryBudgetChange = (categoryName, newBudget) => {
    setCategories(prevCategories => 
      prevCategories.map(category =>
        category.name === categoryName
          ? { ...category, budget: parseFloat(newBudget) }
          : category
      )
    );
  };

  return (
    <div className="app">
      {/* Total Budget Circle Tracker */}
      <div className="progress-circle-container">
        <svg className="circle" width="200" height="200" viewBox="0 0 120 120">
          <circle
            className="circle-background"
            cx="60"
            cy="60"
            r="54"
            stroke="lightgray"
            strokeWidth="12"
            fill="none"
          />
          <circle
            className="circle-progress"
            cx="60"
            cy="60"
            r="54"
            stroke="deepskyblue"
            strokeWidth="12"
            fill="none"
            strokeDasharray="339.292" // Circumference
            strokeDashoffset={(339.292 * (totalBudget - spentTotal)) / totalBudget}
            transform="rotate(-90 60 60)" // Rotate so progress starts from the top
          />
        </svg>
        <div className="progress-text">{spentTotal}/{totalBudget}</div>
      </div>

      {/* Category Progress Circles */}
      {categories.map((category, index) => (
        <div key={index} className="category-container">
          <div className="category-name">{category.name}</div>
          <svg className="circle" width="120" height="120" viewBox="0 0 120 120">
            <circle
              className="circle-background"
              cx="60"
              cy="60"
              r="54"
              stroke="lightgray"
              strokeWidth="12"
              fill="none"
            />
            <circle
              className="circle-progress"
              cx="60"
              cy="60"
              r="54"
              stroke="silver"
              strokeWidth="12"
              fill="none"
              strokeDasharray="339.292"
              strokeDashoffset={(339.292 * (category.budget - category.spent)) / category.budget}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="category-spent">{category.spent}/{category.budget}</div>

          {/* Input for category budget change */}
          <div className="category-input">
            <label>Budget for {category.name}: </label>
            <input
              type="number"
              value={category.budget}
              onChange={(e) => handleCategoryBudgetChange(category.name, e.target.value)}
              min="0"
            />
          </div>
        </div>
      ))}

      {/* Expense Input Form */}
      <div className="expense-input">
        <input
          type="number"
          id="expenseAmount"
          placeholder="Expense Amount"
        />
        <select id="categorySelect">
          {categories.map((category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const amount = document.getElementById('expenseAmount').value;
            const category = document.getElementById('categorySelect').value;
            if (amount && category) {
              handleAddExpense(category, amount);
            }
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default App;
