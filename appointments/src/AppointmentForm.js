import React, { useState } from 'react';

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
}) => {
  const [appointment, setAppointment] = useState({ service });
  return (
    <form
      id="appointment"
      onSubmit={() => onSubmit(appointment)} >
      <label htmlFor="service">Service</label>
      <select id="service" name="service" value={service} readOnly>
        <option />
        {selectableServices.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
        );
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};
