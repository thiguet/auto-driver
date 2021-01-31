import {EntityRepository, Repository} from "typeorm";
import {Driver as DriverEntity} from "../entity/Driver";

@EntityRepository(DriverEntity)
export class Driver extends Repository<DriverEntity> {}
