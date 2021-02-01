import faker from "faker";
import {Driver} from "../../../src/entity/Driver";

export const getFakeDriver = (): Driver => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  rental: []
});

export const getFakeDrivers = (): Driver[] =>
  Array(faker.random.number({min: 0}))
    .fill(null)
    .map(getFakeDriver);
