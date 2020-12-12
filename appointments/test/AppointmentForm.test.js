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

  function findOption(dropdownNode, textContent) {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      (option) => option.textContent === textContent
    );
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

    it('lists list of all saloon services', () => {
      const selectableServices = ['service 1', 'cut & dry'];

      render(
        <AppointmentForm selectableServices={selectableServices} />
      );
      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes.map(
        (node) => node.textContent
      );
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it('pre-selects the existing service', () => {
      const selectableServices = ['service 1', 'cut&dry'];
      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service='cut&dry'
        />
      );
      const selectedOption = findOption(
        field('service'),
        'cut&dry'
      );
      expect(selectedOption.selected).toBeTruthy();
    });
  });
});
