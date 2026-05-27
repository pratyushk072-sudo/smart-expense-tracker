import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MonthlySpending from "./pages/MonthlySpending";
import Analytics from "./pages/Analytics";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const token = localStorage.getItem("token");

  return (

    <Routes>

      <Route
        path="/"
        element={
          token ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/monthly-spending"
        element={
          token ? (
            <MonthlySpending />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/analytics"
        element={
          token ? (
            <Analytics />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

    </Routes>
  );
}

export default App;