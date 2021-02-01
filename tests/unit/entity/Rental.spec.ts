import {PlatformTest} from "@tsed/common";
import {Car} from "../../../src/entity/Car";
import {Driver} from "../../../src/entity/Driver";
import {carTargetFn, carInverseSideFn, driverInverseSideFn, driverTargetFn} from "../../../src/entity/Rental";
import {getFakeCar} from "../helpers/Car";
import {getFakeDriver} from "../helpers/Driver";

describe("Rental Entity", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("must return car", () => {
    expect(carTargetFn()).toEqual(Car);
  });
  it("must return driver", () => {
    expect(driverTargetFn()).toEqual(Driver);
  });

  it("must return car.rental", () => {
    const car = getFakeCar();
    expect(carInverseSideFn(car)).toEqual(car.rental);
  });

  it("must return driver.rental", () => {
    const driver = getFakeDriver();
    expect(driverInverseSideFn(driver)).toEqual(driver.rental);
  });
});
