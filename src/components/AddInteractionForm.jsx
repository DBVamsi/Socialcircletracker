
// FILE: src/components/AddInteractionForm.jsx
import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const AddInteractionForm = ({ contactId }) => {
  const [notes, setNotes] = useState('');
  const [method, setMethod] = useState('In Person');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notes) return;

    // Add new interaction
    await addDoc(collection(db, 'interactions'), {
      ownerId: auth.currentUser.uid,
      contactId,
      notes,
      method,
      date: serverTimestamp(),
    });

    // Update the contact's lastContacted field
    const contactRef = doc(db, 'contacts', contactId);
    await updateDoc(contactRef, {
      lastContacted: serverTimestamp(),
    });

    setNotes('');
    setMethod('In Person');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>In Person</option>
        <option>Phone Call</option>
        <option>Video Call</option>
        <option>Text</option>
        <option>Email</option>
      </select>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What did you talk about?" required></textarea>
      <button type="submit">Log Interaction</button>
    </form>
  );
};

export default AddInteractionForm;
