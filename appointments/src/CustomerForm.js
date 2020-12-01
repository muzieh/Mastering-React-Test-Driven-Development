import React from 'react';

export const CustomerForm = ({ firstName }) => {
  return (
    <form id="customer">
      <label htmlFor="firstName">First name</label>
      <input
        readOnly
        type="text"
        name="firstName"
        value={firstName}
      />
    </form>
  );
};
