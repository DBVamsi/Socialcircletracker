
// FILE: src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import ContactList from '../components/ContactList';
import AddContactForm from '../components/AddContactForm';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch(error => console.error("Sign out error", error));
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h1>Dashboard</h1>
        <nav>
            <Link to="/settings">Settings</Link>
            <button onClick={handleSignOut} style={{ marginLeft: '1rem' }}>Sign Out</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form' : 'Add New Contact'}
        </button>
        {showAddForm && <AddContactForm onClose={() => setShowAddForm(false)} />}
        <ContactList />
      </main>
    </div>
  );
};

export default DashboardPage;
