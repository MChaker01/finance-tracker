import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const TransactionForm = ({ onClose }) => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    amount: "",
    transactionType: "expense",
    category: "Other",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(formData);
    setFormData({
      amount: "",
      transactionType: "expense",
      category: "Other",
      description: "",
      date: "",
    });
    onClose();
  };

  return (
    // 1. Overlay: Slightly lighter black with blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity"
      onClick={onClose}
    >
      {/* 2. Modal Card: Pure white, rounded corners, subtle shadow */}
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Absolute Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Add Transaction</h2>
          <p className="text-slate-500 text-sm mt-1">
            Track your income or expenses
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Amount Input - Highlighted */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 font-bold">
                $
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-800 font-bold text-lg focus:ring-2 focus:ring-emerald-500 transition-all placeholder-slate-300"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Type & Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
              >
                <option value="income">Income (+)</option>
                <option value="expense">Expense (-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer appearance-none"
              >
                <option value="Food">Food & Dining</option>
                <option value="Salary">Salary</option>
                <option value="Transport">Transport</option>
                <option value="Investment Income">Investments</option>
                <option value="Rental Income">Rental</option>
                <option value="Shopping">Shopping</option>
                <option value="HEALTHCARE">Healthcare</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Note (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 transition-all resize-none placeholder-slate-300"
              placeholder="Add a brief note..."
            ></textarea>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform active:scale-95 cursor-pointer"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
