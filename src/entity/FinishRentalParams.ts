import {Example, Property} from "@tsed/schema";

export class FinishRentalParams {
  @Example("1")
  @Property()
  driverId: number;

  @Example("1")
  @Property()
  carId: number;
}
