import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "@/components/protectedRoute";
import HomePage from "@/features/game/pages/HomePage";
import TransactionsPage from "@/features/transaction/pages/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <TransactionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <div className="text-white text-center mt-10">404 - Not Found</div>
    ),
  },
]);
