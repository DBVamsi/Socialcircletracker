
// FILE: src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [user] = useAuthState(auth);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setEmailNotifications(userDoc.data().emailNotifications);
        }
        setLoading(false);
      }
    };
    fetchUserSettings();
  }, [user]);

  const handleToggle = async () => {
    if (user) {
      const newPreference = !emailNotifications;
      setEmailNotifications(newPreference);
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { emailNotifications: newPreference });
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h1>Settings</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleToggle}
          />
          Receive daily email summaries for overdue interactions.
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
