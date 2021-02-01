import faker from "faker";
import {Car} from "../../../src/entity/Car";

export const getFakeCar = (): Car => ({
  id: faker.random.number(),
  plate: faker.random.word(),
  color: faker.commerce.color(),
  brand: faker.commerce.department(),
  rental: []
});

export const getFakeCars = (): Car[] =>
  Array(faker.random.number({min: 0}))
    .fill(null)
    .map(getFakeCar);
