import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useTransactions } from "../context/TransactionContext";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, logout } = useAuth();
  const { income, expenses, balance, fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="min-h-screen bg-slate-50 font-outfit pb-20">
      {/* --- MODAL --- */}
      {isFormOpen && <TransactionForm onClose={() => setIsFormOpen(false)} />}

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-slate-800 tracking-tight">
              FIN<span className="text-emerald-500">TRACK</span>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">
                  {user?.username}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <button
                onClick={logout}
                className="text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                title="Logout"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* 1. Header & Add Button */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Overview</h1>
            <p className="text-slate-500 mt-1">Manage your financial health</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all transform font-medium cursor-pointer"
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
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Transaction
          </button>
        </div>

        {/* 2. STATS GRID (Income / Expense / Balance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Income Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform"></div>
            <p className="text-slate-500 text-sm font-medium relative z-10">
              Total Income
            </p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2 relative z-10">
              ${income.toLocaleString()}
            </h3>
            <div className="mt-4 flex items-center text-emerald-600 text-sm font-bold relative z-10">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              Inflow
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-transform"></div>
            <p className="text-slate-500 text-sm font-medium relative z-10">
              Total Expenses
            </p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2 relative z-10">
              ${expenses.toLocaleString()}
            </h3>
            <div className="mt-4 flex items-center text-red-500 text-sm font-bold relative z-10">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                ></path>
              </svg>
              Outflow
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg relative overflow-hidden text-white">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
            <p className="text-slate-400 text-sm font-medium">Net Balance</p>
            <h3 className="text-4xl font-bold mt-2 tracking-tight">
              ${balance.toLocaleString()}
            </h3>
            <p
              className={`mt-4 text-sm ${
                balance >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {balance >= 0
                ? "You are saving well!"
                : "Alert: Negative balance"}
            </p>
          </div>
        </div>

        {/* 3. RECENT TRANSACTIONS */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">
              Recent Transactions
            </h3>
          </div>
          <div className="p-0">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
