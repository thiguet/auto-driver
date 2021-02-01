import faker from "faker";
import {PlatformTest} from "@tsed/common";
import {CarController} from "../../../src/controllers/CarController";
import {getFakeCar, getFakeCars} from "../helpers/Car";

describe("CarController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);
  const build = async () => {
    const instance = await PlatformTest.invoke<CarController>(CarController);

    const fakeCar = getFakeCar();
    const fakeCars = getFakeCars();
    const fakeId = faker.random.number({min: 0});

    return {
      fakeId,
      instance,
      fakeCar,
      fakeCars
    };
  };

  it("must call spyFindCarsByColorOrBrand.", async () => {
    const {instance, fakeCars} = await build();

    const color = faker.commerce.color();
    const brand = faker.company.companyName();

    const spyFindCarsByColorOrBrand = jest.spyOn(instance.carRepo, "findCarsByColorOrBrand").mockResolvedValue(fakeCars);

    const result = await instance.findAll(color, brand);

    expect(spyFindCarsByColorOrBrand).toBeCalledWith(color, brand);
    expect(result).toEqual(fakeCars);
  });

  it("must call spyFindOneOrFail.", async () => {
    const {instance, fakeCar, fakeId} = await build();

    const spyFindOneOrFail = jest.spyOn(instance.carRepo, "findOneOrFail").mockResolvedValue(fakeCar);

    const result = await instance.find(fakeId);

    expect(spyFindOneOrFail).toBeCalledWith(fakeId);
    expect(result).toEqual(fakeCar);
  });

  it("must call spySave.", async () => {
    const {instance, fakeCar} = await build();
    const spySave = jest.spyOn(instance.carRepo, "save").mockResolvedValue(fakeCar);

    const result = await instance.create(fakeCar);

    expect(spySave).toBeCalledWith(fakeCar);
    expect(result).toEqual(fakeCar);
  });

  it("must call spyUpdate.", async () => {
    const {instance, fakeCar, fakeId} = await build();

    const spyFind = jest.spyOn(instance.carRepo, "findOneOrFail").mockResolvedValue(fakeCar);

    const spyUpdate = jest.spyOn(instance.carRepo, "update").mockResolvedValue({
      raw: [fakeCar],
      generatedMaps: []
    });

    const result = await instance.update(fakeId, fakeCar);

    expect(spyFind).toBeCalledWith(fakeId);
    expect(spyUpdate).toBeCalledWith(fakeId, {...fakeCar, id: fakeId});
    expect(result).toEqual(fakeCar);
  });

  it("must call spyDelete.", async () => {
    const {instance, fakeCar, fakeId} = await build();

    const spyFind = jest.spyOn(instance.carRepo, "findOneOrFail").mockResolvedValue(fakeCar);

    const spyDelete = jest.spyOn(instance.carRepo, "delete").mockResolvedValue({
      raw: [fakeCar]
    });

    const result = await instance.delete(fakeId);

    expect(spyFind).toBeCalledWith(fakeId);
    expect(spyDelete).toBeCalledWith(fakeId);
    expect(result).toEqual(fakeCar);
  });
});
