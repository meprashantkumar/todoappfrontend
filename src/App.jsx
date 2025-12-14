import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TodosPage from "./components/TodosPage";

const App = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <AppContent
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />
    </AuthProvider>
  );
};

const AppContent = ({ showRegister, setShowRegister }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return <TodosPage />;
};

export default App;
