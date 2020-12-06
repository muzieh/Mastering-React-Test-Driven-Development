import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let container, render;

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('can be created', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  function field(name) {
    return form('appointment').elements[name];
  }

  describe('sevice field', () => {
    it('renders service field', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();

    });
  });
});
