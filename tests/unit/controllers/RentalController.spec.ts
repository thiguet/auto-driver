import {PlatformTest, ResourceNotFound} from "@tsed/common";
import {RentalController} from "../../../src/controllers/RentalController";
import {getFakeFinishRentalParams, getFakeRental, getFakeRentalParams, getFakeRentals} from "../helpers/Rental";
import {BadRequest} from "@tsed/exceptions";
import {Rental} from "../../../src/entity/Rental";

describe("Rental Controller", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);
  const build = async () => {
    const instance = await PlatformTest.invoke<RentalController>(RentalController);

    const fakeRental = getFakeRental();
    const fakeRentals = getFakeRentals();
    const fakeRentalParams = getFakeRentalParams();
    const fakeFinishRentalParams = getFakeFinishRentalParams();
    const fakeDate = new Date().toISOString();

    return {
      fakeRentalParams,
      instance,
      fakeRental,
      fakeRentals,
      fakeFinishRentalParams,
      fakeDate
    };
  };

  it("must call getFormerRental.", async () => {
    const {instance, fakeRentals, fakeRentalParams} = await build();

    const spyGetFormerRental = jest.spyOn(instance.rentalRepo, "findOpenedFormerCarRents").mockResolvedValue(fakeRentals);

    const result = await instance.getFormerRental(fakeRentalParams);

    expect(spyGetFormerRental).toBeCalledWith(fakeRentalParams);

    expect(result).toEqual(fakeRentals);
  });

  it("must call save (success).", async () => {
    const {instance, fakeRental, fakeRentalParams} = await build();

    const spyGetFormerRental = jest.spyOn(instance, "getFormerRental").mockResolvedValue([]);
    const spySave = jest.spyOn(instance.rentalRepo, "save").mockResolvedValue(fakeRental);

    const result = await instance.create(fakeRentalParams);

    expect(spyGetFormerRental).toBeCalledWith(fakeRentalParams);

    expect(spySave).toBeCalledWith({
      ...fakeRentalParams,
      driver: {id: fakeRentalParams.driverId},
      car: {id: fakeRentalParams.carId}
    });
    expect(result).toEqual(fakeRental);
  });

  it("must fail when former rentals are retrieved.", async () => {
    const {instance, fakeRental, fakeRentalParams} = await build();

    jest.spyOn(instance, "getFormerRental").mockResolvedValue([fakeRental]);

    expect(instance.create(fakeRentalParams)).rejects.toEqual(
      new BadRequest(
        `You can't perform this operation! Current Rents: ${[fakeRental].reduce(
          (acc: string, r: Rental) => `${acc}\nCar: ${r.car.id}, Driver: ${r.driver.id}\n`,
          ""
        )}`
      )
    );
  });

  it("must call finishRental (success).", async () => {
    const {instance, fakeRental, fakeFinishRentalParams, fakeDate} = await build();

    const spyGetServersDate = jest.spyOn(instance, "getServersDate").mockReturnValue(fakeDate);
    const spyFindLastRental = jest.spyOn(instance.rentalRepo, "findLastRental").mockResolvedValue(fakeRental);
    const spyFinishRental = jest.spyOn(instance.rentalRepo, "save").mockResolvedValue({...fakeRental, endDate: fakeDate});

    const result = await instance.finishRental(fakeFinishRentalParams);

    expect(spyGetServersDate).toBeCalled();
    expect(spyFindLastRental).toBeCalledWith(fakeFinishRentalParams);
    expect(spyFinishRental).toBeCalledWith({...fakeRental, endDate: fakeDate});

    expect(result).toEqual({...fakeRental, endDate: fakeDate});
  });

  it("must fail when no rentalData is retrieved.", async () => {
    const {instance, fakeRentalParams} = await build();

    jest.spyOn(instance.rentalRepo, "findLastRental").mockResolvedValue(undefined);

    expect(instance.create(fakeRentalParams)).rejects.toEqual(new ResourceNotFound("Rental not found or already closed!"));
  });

  it("must call findAllRentals", async () => {
    const {instance, fakeRentals} = await build();

    const spyFindAllRentals = jest.spyOn(instance.rentalRepo, "findAllRentals").mockResolvedValue(fakeRentals);

    const result = await instance.findAll();

    expect(spyFindAllRentals).toBeCalled();

    expect(result).toEqual(fakeRentals);
  });
});
