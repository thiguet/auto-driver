import {Example, Property} from "@tsed/schema";
import {FinishRentalParams} from "./FinishRentalParams";

export class RentalParams extends FinishRentalParams {
  @Example("2012-10-05T14:48:00.000Z")
  @Property()
  startDate: string;

  @Example("Some motive")
  @Property()
  motive: string;
}
