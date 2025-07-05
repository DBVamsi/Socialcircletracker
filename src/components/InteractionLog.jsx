
// FILE: src/components/InteractionLog.jsx
import React from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebaseConfig';
import { format } from 'date-fns';

const InteractionLog = ({ contactId }) => {
  const interactionsRef = collection(db, 'interactions');
  const q = query(interactionsRef, where("contactId", "==", contactId), orderBy("date", "desc"));
  const [interactions, loading, error] = useCollectionData(q, { idField: 'id' });

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>Error loading history.</p>;

  return (
    <div>
      {interactions && interactions.length > 0 ? (
        <ul>
          {interactions.map(interaction => (
            <li key={interaction.id}>
              <strong>{format(interaction.date.toDate(), 'PPP')} ({interaction.method})</strong>: {interaction.notes}
            </li>
          ))}
        </ul>
      ) : (
        <p>No interactions logged yet.</p>
      )}
    </div>
  );
};

export default InteractionLog;
