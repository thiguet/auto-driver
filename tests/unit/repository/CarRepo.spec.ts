import faker from "faker";
import {PlatformTest} from "@tsed/common";
import {getFakeCar, getFakeCars} from "../helpers/Car";
import {CarRepo} from "../../../src/repository/CarRepo";
import {SelectQueryBuilder} from "typeorm";
import {Car} from "../../../src/entity/Car";

describe("Car Repo", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const build = async () => {
    const instance = await PlatformTest.invoke<CarRepo>(CarRepo);
    const fakeCar = getFakeCar();
    const fakeCars = getFakeCars();
    const fakeId = faker.random.number({min: 0});

    jest.spyOn(instance, "createQueryBuilder").mockReturnValue(({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(fakeCars)
    } as unknown) as SelectQueryBuilder<Car>);

    return {
      fakeId,
      instance,
      fakeCar,
      fakeCars
    };
  };

  it("must return fakeCars.", async () => {
    const {instance, fakeCars} = await build();

    const result = await instance.findCarsByColorOrBrand();

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("car");
    expect(result).toEqual(fakeCars);
  });

  it("must return fakeCars with filters.", async () => {
    const {instance, fakeCars} = await build();

    const color = faker.commerce.color();
    const brand = faker.company.companyName();

    const result = await instance.findCarsByColorOrBrand(color, brand);

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("car");
    expect(result).toEqual(fakeCars);
  });

  it("must return fakeCars with filters.", async () => {
    const {instance, fakeCars} = await build();

    const brand = faker.company.companyName();

    const result = await instance.findCarsByColorOrBrand(undefined, brand);

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("car");
    expect(result).toEqual(fakeCars);
  });
});
