import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentsDayView';
import { AppointmentForm} from './AppointmentForm';
import { sampleAppointments } from './sampleData';

ReactDOM.render(
    <div>
        <AppointmentsDayView appointments={sampleAppointments} />
        <AppointmentForm service={'Cut'}/>
    </div>,
  document.getElementById('root')
);
