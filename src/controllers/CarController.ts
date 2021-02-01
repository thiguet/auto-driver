import {BodyParams, Controller, Delete, Get, Inject, PathParams, Post, Put, QueryParams} from "@tsed/common";
import {Returns} from "@tsed/schema";
import {CarRepo} from "../repository/CarRepo";
import {Car, NewCar} from "../entity/Car";

@Controller("/cars")
export class CarController {
  @Inject()
  public carRepo: CarRepo;

  @Post()
  @Returns(200, Car)
  async create(@BodyParams() car: NewCar): Promise<Car> {
    return await this.carRepo.save({...car});
  }

  @Get("/:id")
  @Returns(200, Car)
  public async find(@PathParams("id") id: number): Promise<Car> {
    return await this.carRepo.findOneOrFail(id);
  }

  @Get()
  @Returns(200, Car)
  async findAll(@QueryParams("color") color?: string, @QueryParams("brand") brand?: string): Promise<Car[]> {
    return await this.carRepo.findCarsByColorOrBrand(color, brand);
  }

  @Put("/:id")
  @Returns(200, Car)
  public async update(@PathParams("id") id: number, @BodyParams("car") car: Car): Promise<Car> {
    await this.carRepo.findOneOrFail(id);
    return (await this.carRepo.update(id, {...car, id})).raw[0];
  }

  @Delete("/:id")
  @Returns(200, Car)
  async delete(@PathParams("id") id: number): Promise<Car> {
    await this.carRepo.findOneOrFail(id);
    return (await this.carRepo.delete(id)).raw[0];
  }
}
