import {PlatformTest} from "@tsed/common";
import {RentalController} from "../src/controllers/Rental";

describe("HelloWorldController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<RentalController>(RentalController);
    // const instance = PlatformTest.invoke<RentalController>(RentalController); // get fresh instance

    expect(instance).toBeInstanceOf(RentalController);
  });
});
