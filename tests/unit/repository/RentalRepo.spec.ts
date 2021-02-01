import faker from "faker";
import {PlatformTest} from "@tsed/common";
import {getFakeRental, getFakeRentalParams, getFakeRentals} from "../helpers/Rental";
import {RentalRepo} from "../../../src/repository/RentalRepo";
import {SelectQueryBuilder} from "typeorm";
import {Rental} from "../../../src/entity/Rental";

describe("Rental Repo", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const build = async () => {
    const instance = await PlatformTest.invoke<RentalRepo>(RentalRepo);
    const fakeRental = getFakeRental();
    const fakeRentals = getFakeRentals();
    const fakeRentalParams = getFakeRentalParams();
    const fakeId = faker.random.number({min: 0});

    jest.spyOn(instance, "createQueryBuilder").mockReturnValue(({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(fakeRentals),
      getOne: jest.fn().mockResolvedValue(fakeRental)
    } as unknown) as SelectQueryBuilder<Rental>);

    return {
      fakeId,
      instance,
      fakeRental,
      fakeRentals,
      fakeRentalParams
    };
  };

  it("must return all rentals.", async () => {
    const {instance, fakeRentals} = await build();

    const result = await instance.findAllRentals();

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("rental");
    expect(result).toEqual(fakeRentals);
  });

  it("must return former registers of opened car rents.", async () => {
    const {instance, fakeRentals, fakeRentalParams} = await build();

    const result = await instance.findOpenedFormerCarRents(fakeRentalParams);

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("rental");
    expect(result).toEqual(fakeRentals);
  });

  it("must return last rental.", async () => {
    const {instance, fakeRental, fakeRentalParams} = await build();

    const result = await instance.findLastRental(fakeRentalParams);

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("rental");
    expect(result).toEqual(fakeRental);
  });
});
