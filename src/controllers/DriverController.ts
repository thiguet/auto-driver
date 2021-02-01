import {BodyParams, Controller, Delete, Get, Inject, PathParams, Post, Put, QueryParams} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {DriverRepo} from "../repository/DriverRepo";
import {Driver} from "../entity/Driver";

@Controller("/drivers")
export class DriverController {
  @Inject()
  public driverRepo: DriverRepo;

  @Post()
  @Returns(200, Driver)
  async create(@BodyParams() Driver: Driver): Promise<Driver> {
    return await this.driverRepo.save(Driver);
  }

  @Get("/:id")
  @Returns(200, Driver)
  async find(@PathParams("id") id: Driver["id"]): Promise<Driver | undefined> {
    return await this.driverRepo.findOneOrFail(id);
  }

  @Get()
  @Returns(200, Driver)
  async findAll(@QueryParams("name") name: string): Promise<Driver[]> {
    return this.driverRepo.findDriversByName(name);
  }

  @Put("/:id")
  @Returns(200, Driver)
  async update(@PathParams("id") id: Driver["id"], @BodyParams("Driver") Driver: Driver): Promise<Driver> {
    await this.driverRepo.findOneOrFail(id);
    return (await this.driverRepo.update(id, {...Driver, id})).raw[0];
  }

  @Delete("/:id")
  @Returns(200, Driver)
  async delete(@PathParams("id") id: Driver["id"]): Promise<Driver> {
    await this.driverRepo.findOneOrFail(id);
    return (await this.driverRepo.delete(id)).raw[0];
  }
}
