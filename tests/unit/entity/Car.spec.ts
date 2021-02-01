import {PlatformTest} from "@tsed/common";
import {targetFn, inverseSideFn} from "../../../src/entity/Car";
import {Rental} from "../../../src/entity/Rental";
import {getFakeRental} from "../helpers/Rental";

describe("Car Entity", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("must return Rental.", () => {
    expect(targetFn()).toEqual(Rental);
  });

  it("must return car.rental.", () => {
    const rental = getFakeRental();
    expect(inverseSideFn(rental)).toEqual(rental.car);
  });
});
