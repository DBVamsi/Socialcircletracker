
// FILE: src/components/AddContactForm.jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const AddContactForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [frequency, setFrequency] = useState(30);
  const [longTerm, setLongTerm] = useState('');
  const [shortTerm, setShortTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !relationship) return;

    await addDoc(collection(db, 'contacts'), {
      ownerId: auth.currentUser.uid,
      name,
      relationship,
      frequency: Number(frequency),
      longTermInterests: longTerm,
      shortTermInterests: shortTerm,
      lastContacted: null,
      createdAt: serverTimestamp(),
    });

    onClose(); // Close form after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Add a New Contact</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /> <br/>
      <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Relationship" required /> <br/>
      <label>Interaction Frequency (days):</label>
      <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} required /> <br/>
      <textarea value={longTerm} onChange={(e) => setLongTerm(e.target.value)} placeholder="Long-term interests"></textarea> <br/>
      <textarea value={shortTerm} onChange={(e) => setShortTerm(e.target.value)} placeholder="Short-term interests"></textarea> <br/>
      <button type="submit">Add Contact</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddContactForm;
