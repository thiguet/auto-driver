import faker from "faker";
import {FinishRentalParams} from "../../../src/entity/FinishRentalParams";
import {Rental} from "../../../src/entity/Rental";
import {RentalParams} from "../../../src/entity/RentalParams";

export const getFakeRental = (): Rental => ({
  id: faker.random.number(),
  car: {
    id: faker.random.number(),
    plate: faker.random.word(),
    color: faker.commerce.color(),
    brand: faker.commerce.department(),
    rental: []
  },
  driver: {
    id: faker.random.number(),
    name: faker.name.findName(),
    rental: []
  },
  startDate: faker.date.recent().toISOString(),
  endDate: faker.date.recent().toISOString(),
  motive: faker.lorem.lines()
});

export const getFakeRentalParams = (): RentalParams => ({
  ...getFakeFinishRentalParams(),
  startDate: faker.date.recent().toISOString(),
  motive: faker.lorem.lines()
});

export const getFakeFinishRentalParams = (): FinishRentalParams => ({
  driverId: faker.random.number({min: 0}),
  carId: faker.random.number({min: 0})
});

export const getFakeRentals = (): Rental[] =>
  Array(faker.random.number({min: 0}))
    .fill(null)
    .map(getFakeRental);
