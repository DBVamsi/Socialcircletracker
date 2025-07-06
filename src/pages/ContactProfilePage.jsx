
// FILE: src/pages/ContactProfilePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc } from 'firebase/firestore'; // Removed getDoc
import { db } from '../firebaseConfig';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import InteractionLog from '../components/InteractionLog';
import AddInteractionForm from '../components/AddInteractionForm';

const ContactProfilePage = () => {
  const { id } = useParams();
  const contactRef = doc(db, 'contacts', id);
  const [contact, loading, error] = useDocumentData(contactRef);

  if (loading) return <div>Loading contact...</div>;
  if (error) return <div>Error loading contact.</div>;
  if (!contact) return <div>Contact not found.</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h1>{contact.name}</h1>
      <p><strong>Relationship:</strong> {contact.relationship}</p>
      <p><strong>Interaction Frequency:</strong> Every {contact.frequency} days</p>
      <p><strong>Long-term Interests:</strong> {contact.longTermInterests}</p>
      <p><strong>Short-term Interests:</strong> {contact.shortTermInterests}</p>
      
      <hr />
      
      <h2>Log a New Interaction</h2>
      <AddInteractionForm contactId={id} />
      
      <hr />

      <h2>Interaction History</h2>
      <InteractionLog contactId={id} />
    </div>
  );
};

export default ContactProfilePage;
