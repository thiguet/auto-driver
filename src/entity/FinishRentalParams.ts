import {Example, Property} from "@tsed/schema";

export class FinishRentalParams {
  @Example("1")
  @Property()
  driverId: string;

  @Example("1")
  @Property()
  carId: string;
}
