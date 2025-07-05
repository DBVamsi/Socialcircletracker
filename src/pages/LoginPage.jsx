
// FILE: src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  // Handle the redirect result
  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          // Check if user exists in Firestore, if not, create a new document
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              displayName: user.displayName,
              email: user.email,
              emailNotifications: false, // Default to off
            });
          }
        }
      } catch (error) {
        console.error("Error processing redirect result:", error);
      }
    };

    processRedirectResult();
  }, []);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Social Circle Tracker</h1>
      <p>Your personal relationship manager.</p>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default LoginPage;
