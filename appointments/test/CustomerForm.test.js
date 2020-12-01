import React from 'react';
import { createContainer } from './domManipulator';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ container, render } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (name) => form('customer').elements[name];

  const labelFor = (name) =>
    form('customer').querySelector(`label[for='${name}']`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  function itRendersAsATextInput(fieldName) {
    it('renders as a text input', () => {
      render(<CustomerForm />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual('INPUT');
      expect(field(fieldName).type).toEqual('text');
      expect(field(fieldName).name).toEqual(fieldName);
    });
  }

  function itIncludesAnExistingValue(fieldName) {
    it('includes an existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  }

  function itRendersALabel(fieldName, labelText) {
    it('renders a label', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);

      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(labelText);
    });
  }

  function itRendersIdAttributeForTextInput(fieldName) {
    it('renders id attribute for text input', () => {
      render(<CustomerForm />);

      expect(field(fieldName).id).toEqual(fieldName);
    });
  }

  function itSavesExistingValueWhenSubmitted(
    fieldName,
    initialValue
  ) {
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: initialValue }}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(initialValue)
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  }

  function itSavesNewValueWhenSubmitted(fieldName, newValue) {
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'initialValue' }}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(newValue)
          }
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value: newValue, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  }

  describe('first name field', () => {
    itRendersAsATextInput('firstName');

    itIncludesAnExistingValue('firstName');

    itRendersALabel('firstName', 'First name');

    itRendersIdAttributeForTextInput('firstName');

    itSavesExistingValueWhenSubmitted('firstName', 'initialValue');

    itSavesNewValueWhenSubmitted('firstName', 'Jamie');
  });

  describe('last name field', () => {
    itRendersAsATextInput('lastName');

    itIncludesAnExistingValue('lastName');

    itRendersALabel('lastName', 'Last name');

    itRendersIdAttributeForTextInput('lastName');

    itSavesExistingValueWhenSubmitted('lastName', 'initialValue');

    itSavesNewValueWhenSubmitted('lastName', 'Oliver');
  });

  describe('phone number field', () => {
    itRendersAsATextInput('phoneNumber');

    itIncludesAnExistingValue('phoneNumber');

    itRendersALabel('phoneNumber', 'Phone number');

    itRendersIdAttributeForTextInput('phoneNumber');

    itSavesExistingValueWhenSubmitted(
      'phoneNumber',
      'initialValue'
    );

    itSavesNewValueWhenSubmitted('phoneNumber', '+44 123 123');
  });
});
