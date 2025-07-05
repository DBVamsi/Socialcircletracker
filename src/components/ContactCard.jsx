
// FILE: src/components/ContactCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { differenceInDays, fromUnixTime } from 'date-fns';

const ContactCard = ({ contact }) => {
  const isDue = () => {
    if (!contact.lastContacted) return true; // Always due if never contacted
    const lastContactDate = fromUnixTime(contact.lastContacted.seconds);
    const daysSinceLastContact = differenceInDays(new Date(), lastContactDate);
    return daysSinceLastContact >= contact.frequency;
  };

  const cardStyle = {
    border: `2px solid ${isDue() ? 'red' : 'green'}`,
    padding: '1rem',
    borderRadius: '8px',
    width: '250px',
  };

  return (
    <div style={cardStyle}>
      <h3>{contact.name}</h3>
      <p>{contact.relationship}</p>
      <p>Due for interaction: {isDue() ? 'Yes' : 'No'}</p>
      <Link to={`/contact/${contact.id}`}>View Details</Link>
    </div>
  );
};

export default ContactCard;
