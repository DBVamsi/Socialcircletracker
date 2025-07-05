
// FILE: src/components/ContactList.jsx
import React from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebaseConfig';
import ContactCard from './ContactCard';

const ContactList = () => {
  const user = auth.currentUser;
  const contactsRef = collection(db, 'contacts');
  const q = user ? query(contactsRef, where("ownerId", "==", user.uid)) : null;
  const [contacts, loading, error] = useCollectionData(q, { idField: 'id' });

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <div>
      <h2>Your Contacts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {contacts && contacts.length > 0 ? (
          contacts.map(contact => <ContactCard key={contact.id} contact={contact} />)
        ) : (
          <p>You haven't added any contacts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
