import {EntityRepository, Repository} from "typeorm";
import {Driver} from "../entity/Driver";

@EntityRepository(Driver)
export class DriverRepo extends Repository<Driver> {
  async findDriversByName(name?: Driver["name"]): Promise<Driver[]> {
    const query = this.createQueryBuilder("driver");

    if (name) {
      query.where("driver.name like :name", {name: `%${name}%`});
    }

    return await query.getMany();
  }
}
