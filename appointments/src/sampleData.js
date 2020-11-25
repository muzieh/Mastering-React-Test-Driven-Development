import {lorem, name, phone} from 'faker';

const today = new Date();

Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

Array.prototype.pickRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const at = (hours) => today.setHours(hours, 0);
const createFakeCustomer = () => ({
  firstName: name.firstName(),
  lastName: name.lastName(),
  phoneNumber: phone.phoneNumber(),
});

const services = ['ser1', 'ser2', 'ser3'];

const stylists = [1, 2, 3, 4, 5, 6]
  .map(() => name.firstName())
  .unique();

const createFakeAppointment = () => ({
  customer: {...createFakeCustomer()},
  service: services.pickRandom(),
  stylist: stylists.pickRandom(),
  notes: lorem.paragraph(),
});

console.log(createFakeCustomer());

export const sampleAppointments = [
  {startsAt: at(8), ...createFakeAppointment()},
  {startsAt: at(9), ...createFakeAppointment()},
  {startsAt: at(10), ...createFakeAppointment()},
  {startsAt: at(11), ...createFakeAppointment()},
  {startsAt: at(12), ...createFakeAppointment()},
  {startsAt: at(13), ...createFakeAppointment()},
  {startsAt: at(14), ...createFakeAppointment()},
  {startsAt: at(15), ...createFakeAppointment()},
  {startsAt: at(16), ...createFakeAppointment()},
  {startsAt: at(17), ...createFakeAppointment()},
];
