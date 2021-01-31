import {BodyParams, Controller, Delete, Get, Inject, PathParams, Post, Put, QueryParams} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {Driver as DriverRepo} from "../repository/Driver";
import {Driver} from "../entity/Driver";

@Controller("/drivers")
export class DriverController {
  @Inject()
  private driverRepo: DriverRepo;

  @Post()
  @Returns(200, Driver)
  async create(@BodyParams() Driver: Driver): Promise<Driver> {
    return await this.driverRepo.save(Driver);
  }

  @Get("/:id")
  @Returns(200, Driver)
  public async get(@PathParams("id") id: Driver["id"]): Promise<Driver | undefined> {
    return await this.driverRepo.findOne(id);
  }

  @Get()
  @Returns(200, Driver)
  async findAll(@QueryParams("name") name: string): Promise<Driver[]> {
    const query = this.driverRepo.createQueryBuilder("driver");

    if (name) {
      query.where("driver.name like :name", {name: `%${name}%`});
    }

    return await query.getMany();
  }

  @Put("/:id")
  @Returns(200, Driver)
  public async update(@PathParams("id") id: Driver["id"], @BodyParams("Driver") Driver: Driver): Promise<Driver> {
    return (await this.driverRepo.update(id, {...Driver, id})).raw[0];
  }

  @Delete("/:id")
  @Returns(200, Driver)
  async delete(@PathParams("id") id: Driver["id"]): Promise<Driver> {
    return (await this.driverRepo.delete(id)).raw[0];
  }
}
