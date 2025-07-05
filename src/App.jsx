
// FILE: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactProfilePage from './pages/ContactProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [user, loading] = useAuthState(auth);

  console.log('App.jsx - User:', user);
  console.log('App.jsx - Loading:', loading);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Router basename="/Socialcircletracker/">
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/contact/:id" element={user ? <ContactProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
