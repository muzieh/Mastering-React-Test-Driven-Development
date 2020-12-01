import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';
import { CustomerForm } from './CustomerForm';


ReactDOM.render(
  <div>
    <AppointmentsDayView appointments={sampleAppointments} />
    <CustomerForm />
  </div>,
  document.getElementById('root')
);
