import React, { useState, useEffect } from "react";
import "./index.css";
import { salesData, expensesData } from "./data";

function App() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setSales(
      salesData.map((item) => ({
        ...item,
        quantity: null,
        unitPrice: null,
        total: 0,
      }))
    );
    setExpenses(
      expensesData.map((item) => ({
        ...item,
        quantity: null,
        unitPrice: null,
        total: 0,
      }))
    );
  }, []);

  const handleInputChange = (items, setItems, index) => (event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value ? parseInt(value) : null;
    updatedItems[index].total =
      (updatedItems[index].quantity || 0) *
      (updatedItems[index].unitPrice || 0);
    setItems(updatedItems);
  };

  const calculateSum = (items) => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  return (
    <div className="App">
      <h1>収支計算</h1>
      <h2>売上</h2>
      {sales.map((sale, index) => (
        <div key={index} className="item-row">
          <label>{sale.name}</label>
          <input
            name="quantity"
            type="number"
            value={sale.quantity}
            onChange={handleInputChange(sales, setSales, index)}
          />
          <label>{sale.unit}</label>
          <input
            name="unitPrice"
            type="number"
            value={sale.unitPrice}
            onChange={handleInputChange(sales, setSales, index)}
          />
          <p>合計: {sale.total}</p>
        </div>
      ))}

      <h3>売上合計: {calculateSum(sales)}</h3>

      <h2>支出</h2>
      {expenses.map((expense, index) => (
        <div key={index} className="item-row">
          <label>{expense.name}</label>
          <input
            name="quantity"
            type="number"
            value={expense.quantity}
            onChange={handleInputChange(expenses, setExpenses, index)}
          />
          <label>{expense.unit}</label>
          <input
            name="unitPrice"
            type="number"
            value={expense.unitPrice}
            onChange={handleInputChange(expenses, setExpenses, index)}
          />
          <p>合計: {expense.total}</p>
        </div>
      ))}
      <h3>支出合計: {calculateSum(expenses)}</h3>

      <h2>
        収支: {(calculateSum(sales) - calculateSum(expenses)).toLocaleString()}
      </h2>
    </div>
  );
}

export default App;
