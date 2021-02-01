import faker from "faker";
import {PlatformTest} from "@tsed/common";
import {getFakeDriver, getFakeDrivers} from "../helpers/Driver";
import {DriverRepo} from "../../../src/repository/DriverRepo";
import {Driver} from "../../../src/entity/Driver";
import {SelectQueryBuilder} from "typeorm";

describe("Driver Repo", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const build = async () => {
    const instance = await PlatformTest.invoke<DriverRepo>(DriverRepo);

    const fakeDriver = getFakeDriver();
    const fakeDrivers = getFakeDrivers();

    jest.spyOn(instance, "createQueryBuilder").mockReturnValue(({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(fakeDrivers)
    } as unknown) as SelectQueryBuilder<Driver>);

    return {
      instance,
      fakeDriver,
      fakeDrivers
    };
  };

  it("must return fakeDrivers.", async () => {
    const {instance, fakeDrivers} = await build();

    const result = await instance.findDriversByName();

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("driver");
    expect(result).toEqual(fakeDrivers);
  });

  it("must return fakeDrivers with filters.", async () => {
    const {instance, fakeDrivers} = await build();

    const name = faker.name.firstName();

    const result = await instance.findDriversByName(name);

    expect(instance.createQueryBuilder).toHaveBeenCalledWith("driver");
    expect(result).toEqual(fakeDrivers);
  });
});
