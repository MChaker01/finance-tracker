import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {} from "react";
import {
  createTransaction,
  getAllTransactions,
  deleteTransactionById,
} from "../utils/api";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const income = useMemo(() => {
    return (transactions || [])
      .filter((transaction) => transaction.transactionType === "income")
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
  }, [transactions]);

  const expenses = useMemo(() => {
    return (transactions || [])
      .filter((transaction) => transaction.transactionType === "expense")
      .reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
  }, [transactions]);

  const balance = income - expenses;

  const addTransaction = async (formData) => {
    try {
      const response = await createTransaction(formData);
      setTransactions([response.transaction, ...transactions]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (idToDelete) => {
    try {
      const response = await deleteTransactionById(idToDelete);
      setTransactions((prev) => prev.filter((t) => t._id !== idToDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getAllTransactions();
      console.log("Data from API:", data);
      setTransactions(data || []);
    } catch (error) {
      console.error(error);
    }
  }, []); // The empty array means "this function never changes"

  const value = {
    transactions,
    income,
    expenses,
    balance,
    addTransaction,
    deleteTransaction,
    fetchTransactions,
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactions = () => {
  const context = useContext(TransactionContext);

  // Error handling: ensure hook is used within Provider
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }

  return context;
};
