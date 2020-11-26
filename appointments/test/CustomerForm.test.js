import React from 'react';
import { createContainer } from './domManipulator';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ container, render } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('contains firstName input field', () => {
    render(<CustomerForm />);
    const field = form('customer').elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toEqual('text');
  });
});
