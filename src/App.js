import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ReportPage from "./pages/report";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";

function App() {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />

        <Route path="/report" element={<ReportPage />} />
      </Routes>
      <Toaster />
    </Router>

    // <Login />
  );
}

export default App;
