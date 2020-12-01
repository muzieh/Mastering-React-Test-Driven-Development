import React, { useState } from 'react';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  return (
    <form
      id="customer"
      onSubmit={() => {
        onSubmit(customer);
      }}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        value={customer.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        value={customer.lastName}
        onChange={handleChange}
      />

      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
      />
      <input type='submit' value='Add' />
    </form>
  );
};
