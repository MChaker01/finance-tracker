import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authContext";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RootRedirect from "./components/RootRedirect";
import { TransactionProvider } from "./context/TransactionContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <TransactionProvider>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </TransactionProvider>
          }
        ></Route>

        <Route path="/" element={<RootRedirect />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
