import React from 'react';
import { createContainer } from './domManipulator';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ container, render } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const firstNameField = () => form('customer').elements.firstName;
  const labelFor = (name) =>
    form('customer').querySelector(`label[for='${name}']`);
  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('contains firstName input field', () => {
    render(<CustomerForm />);
    expect(firstNameField()).not.toBeNull();
    expect(firstNameField().tagName).toEqual('INPUT');
    expect(firstNameField().type).toEqual('text');
    expect(firstNameField().name).toEqual('firstName');
  });

  it('contains first name in input field for initial load', () => {
    render(<CustomerForm firstName="Ashley" />);
    expect(firstNameField().value).toEqual('Ashley');
  });

  it('renders label for first name field', () => {
    render(<CustomerForm firstName="Ashley" />);

    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual(
      'First name'
    );
  });
});
