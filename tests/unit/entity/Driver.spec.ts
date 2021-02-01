import {PlatformTest} from "@tsed/common";
import {targetFn, inverseSideFn} from "../../../src/entity/Driver";
import {Rental} from "../../../src/entity/Rental";
import {getFakeRental} from "../helpers/Rental";

describe("Driver Entity", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("must return Rental.", () => {
    expect(targetFn()).toEqual(Rental);
  });

  it("must return Driver.rental.", () => {
    const rental = getFakeRental();
    expect(inverseSideFn(rental)).toEqual(rental.driver);
  });
});
