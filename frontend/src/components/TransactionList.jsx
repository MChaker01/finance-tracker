import React from "react";
import { useTransactions } from "../context/TransactionContext";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        No transactions found. Add one to get started!
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {transactions.map((transaction) => {
        const isIncome = transaction.transactionType === "income";

        return (
          <div
            key={transaction._id}
            className="group flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
            {/* Left: Icon & Details */}
            <div className="flex items-center gap-4">
              {/* Category Icon (Simple logic based on type) */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                ${
                  isIncome
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }
              `}
              >
                {isIncome ? "💰" : "💸"}
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  {transaction.category}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(transaction.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {transaction.description && ` • ${transaction.description}`}
                </p>
              </div>
            </div>

            {/* Right: Amount & Delete */}
            <div className="flex items-center gap-6">
              <span
                className={`font-bold text-lg ${
                  isIncome ? "text-emerald-600" : "text-slate-800"
                }`}
              >
                {isIncome ? "+" : "-"}${transaction.amount}
              </span>

              <button
                onClick={() => deleteTransaction(transaction._id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Delete Transaction"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
