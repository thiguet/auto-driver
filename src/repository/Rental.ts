import {EntityRepository, Repository} from "typeorm";
import {FinishRentalParams} from "../entity/FinishRentalParams";
import {Rental as RentalEntity} from "../entity/Rental";
import {RentalParams} from "../entity/RentalParams";

@EntityRepository(RentalEntity)
export class Rental extends Repository<RentalEntity> {
  findIfDriverCanRentTheCar({driverId, carId}: RentalParams): Promise<RentalEntity[]> {
    return this.createQueryBuilder("rental")
      .leftJoinAndSelect("rental.driver", "driver")
      .leftJoinAndSelect("rental.car", "car")
      .where("(rental.driverId = :driverId AND rental.endDate IS NULL)", {driverId})
      .orWhere("(rental.carId = :carId AND rental.endDate IS NULL)", {carId})
      .getMany();
  }

  findLastRental({driverId, carId}: FinishRentalParams): Promise<RentalEntity | undefined> {
    return this.createQueryBuilder("rental")
      .leftJoinAndSelect("rental.driver", "driver")
      .leftJoinAndSelect("rental.car", "car")
      .where("rental.driverId = :driverId", {driverId})
      .andWhere("rental.carId = :carId", {carId})
      .andWhere("rental.endDate IS NULL")
      .getOne();
  }

  findAllRentals(): Promise<RentalEntity[]> {
    return this.createQueryBuilder("rental")
      .innerJoinAndSelect("rental.driver", "driver")
      .innerJoinAndSelect("rental.car", "car")
      .getMany();
  }
}
