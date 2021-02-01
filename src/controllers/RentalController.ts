import {BodyParams, Controller, Get, Inject, Patch, Post, ResourceNotFound} from "@tsed/common";
import {RentalRepo as RentalRepo} from "../repository/RentalRepo";
import {Rental} from "../entity/Rental";
import {RentalParams} from "../entity/RentalParams";
import {Returns} from "@tsed/schema";
import {FinishRentalParams} from "../entity/FinishRentalParams";
import {BadRequest} from "@tsed/exceptions";

@Controller("/rentals")
export class RentalController {
  @Inject()
  public rentalRepo: RentalRepo;

  async getFormerRental(rentalParams: RentalParams): Promise<Rental[]> {
    return await this.rentalRepo.findOpenedFormerCarRents(rentalParams);
  }

  getServersDate(): Rental["endDate"] {
    return new Date().toISOString();
  }

  @Post()
  @Returns(200, Rental)
  @Returns(400, BadRequest)
  async create(@BodyParams() rentalParams: RentalParams): Promise<Rental> {
    const rentalData = await this.getFormerRental(rentalParams);

    if (rentalData && rentalData.length) {
      throw new BadRequest(
        `You can't perform this operation! Current Rents: ${rentalData.reduce(
          (acc: string, r: Rental) => `${acc}\nCar: ${r.car.id}, Driver: ${r.driver.id}\n`,
          ""
        )}`
      );
    }

    return await this.rentalRepo.save({
      ...rentalParams,
      driver: {id: rentalParams.driverId},
      car: {id: rentalParams.carId}
    });
  }

  @Patch("/finish")
  @Returns(200, Rental)
  @Returns(404, ResourceNotFound)
  async finishRental(@BodyParams() rentalParams: FinishRentalParams): Promise<Rental> {
    const rentalData = await this.rentalRepo.findLastRental(rentalParams);

    if (!rentalData) {
      throw new ResourceNotFound("Rental not found or already closed!");
    }

    return this.rentalRepo.save({
      ...rentalData,
      endDate: this.getServersDate()
    });
  }

  @Get()
  @Returns(200, Rental)
  async findAll(): Promise<Rental[]> {
    return await this.rentalRepo.findAllRentals();
  }
}
