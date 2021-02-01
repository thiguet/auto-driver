import faker from "faker";
import {PlatformTest} from "@tsed/common";
import {DriverController} from "../../../src/controllers/DriverController";
import {getFakeDriver, getFakeDrivers} from "../helpers/Driver";

describe("DriverController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);
  const build = async () => {
    const instance = await PlatformTest.invoke<DriverController>(DriverController);

    const fakeDriver = getFakeDriver();
    const fakeDrivers = getFakeDrivers();
    const fakeId = faker.random.number({min: 0});

    return {
      fakeId,
      instance,
      fakeDriver,
      fakeDrivers
    };
  };

  it("must call findDriversByName method.", async () => {
    const {instance, fakeDrivers} = await build();

    const name = faker.name.firstName();

    const findDriversByName = jest.spyOn(instance.driverRepo, "findDriversByName").mockResolvedValue(fakeDrivers);

    const result = await instance.findAll(name);

    expect(findDriversByName).toBeCalledWith(name);
    expect(result).toEqual(fakeDrivers);
  });

  it("must call findOneOrFail method.", async () => {
    const {instance, fakeDriver, fakeId} = await build();

    const spyFindOneOrFail = jest.spyOn(instance.driverRepo, "findOneOrFail").mockResolvedValue(fakeDriver);

    const result = await instance.find(fakeId);

    expect(spyFindOneOrFail).toBeCalledWith(fakeId);
    expect(result).toEqual(fakeDriver);
  });

  it("must call repo's save method.", async () => {
    const {instance, fakeDriver} = await build();
    const spySave = jest.spyOn(instance.driverRepo, "save").mockResolvedValue(fakeDriver);

    const result = await instance.create(fakeDriver);

    expect(spySave).toBeCalledWith(fakeDriver);
    expect(result).toEqual(fakeDriver);
  });

  it("must call repo's update method.", async () => {
    const {instance, fakeDriver, fakeId} = await build();

    const spyFind = jest.spyOn(instance.driverRepo, "findOneOrFail").mockResolvedValue(fakeDriver);

    const spyUpdate = jest.spyOn(instance.driverRepo, "update").mockResolvedValue({
      raw: [fakeDriver],
      generatedMaps: []
    });

    const result = await instance.update(fakeId, fakeDriver);

    expect(spyFind).toBeCalledWith(fakeId);
    expect(spyUpdate).toBeCalledWith(fakeId, {...fakeDriver, id: fakeId});
    expect(result).toEqual(fakeDriver);
  });

  it("must call repo's delete method.", async () => {
    const {instance, fakeDriver, fakeId} = await build();

    const spyFind = jest.spyOn(instance.driverRepo, "findOneOrFail").mockResolvedValue(fakeDriver);

    const spyDelete = jest.spyOn(instance.driverRepo, "delete").mockResolvedValue({
      raw: [fakeDriver]
    });

    const result = await instance.delete(fakeId);

    expect(spyFind).toBeCalledWith(fakeId);
    expect(spyDelete).toBeCalledWith(fakeId);
    expect(result).toEqual(fakeDriver);
  });
});
