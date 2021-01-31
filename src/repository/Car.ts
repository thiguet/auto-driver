import {EntityRepository, Repository} from "typeorm";
import {Car as CarEntity} from "../entity/Car";

@EntityRepository(CarEntity)
export class Car extends Repository<CarEntity> {
  async findCarsByColorOrBrand(color: CarEntity["color"], brand: CarEntity["brand"]): Promise<CarEntity[]> {
    const query = this.createQueryBuilder("car");

    if (color) {
      query.where("car.color like :color", {color: `%${color}%`});
    }

    if (brand) {
      query.where("car.brand like :brand", {brand: `%${brand}%`});
    }

    return await query.getMany();
  }
}
