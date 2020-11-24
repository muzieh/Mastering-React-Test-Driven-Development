import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import {Appointment, AppointmentsDayView,} from '../src/AppointmentsDayView';

describe('Appointment', () => {
  let container;
  let customer;
  let appointment;

  beforeEach(() => {
    container = document.createElement('div');

    customer = {
      firstName: 'Ashley',
      lastName: 'Bings',
    };

    appointment = {
      startsAt: new Date().setHours(13, 20),
      stylist: 'Ben Shapiro',
      service: 'perm',
      note: 'some note',
      customer: customer,
    };
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders content in table', () => {
    render(<Appointment customer={customer}/>);
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('renders appointment header', () => {
    render(<Appointment customer={customer}/>);
    expect(container.querySelector('h2')).not.toBeNull();
  });

  it('renders appointment start time in header', () => {
    render(<Appointment {...appointment} />);
    expect(container.querySelector('h2').textContent).toMatch(
      '13:20'
    );
  });

  it('renders the customer first name', () => {
    render(<Appointment customer={customer}/>);
    expect(container.textContent).toMatch('Ashley');
  });

  it('renders the customer last name', () => {
    render(<Appointment customer={customer}/>);
    expect(container.textContent).toMatch('Bings');
  });

  it('renders the customer stylist', () => {
    render(<Appointment {...appointment} />);
    expect(container.textContent).toMatch('Ben Shapiro');
  });

  it('renders the customer service', () => {
    render(
      <Appointment
        customer={appointment.customer}
        service={appointment.service}
      />
    );
    expect(container.textContent).toMatch('perm');
  });

  it('renders the customer note', () => {
    render(<Appointment {...appointment} />);
    expect(container.textContent).toMatch('some note');
  });

  it('renders another customer first name', () => {
    customer = {firstName: 'Jordan'};
    render(<Appointment customer={customer}/>);
    expect(container.textContent).toMatch('Jordan');
  });
});

describe('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {firstName: 'Ashley'},
      note: 'some note',
      service: 'perm',
      stylist: 'Ben Shapiro',
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {firstName: 'Jordan'},
    },
  ];
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      container.querySelector('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00');
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(
      2
    );
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments}/>);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('Jordan');
  });

  it('snapshot test', () => {
    const tree = TestRenderer.create(
      <AppointmentsDayView appointments={appointments}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
