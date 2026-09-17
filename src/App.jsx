import "./App.css";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import PrivateRoute from "./Componentes/PrivateRoute";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  return (
    <div className="app-root">
      <Sidebar
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }}
      />
      <div className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
