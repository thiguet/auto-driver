import {Description, Example, Maximum, Minimum, Property, Required, Title} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ObjectType} from "typeorm";
import {Car} from "./Car";
import {Driver} from "./Driver";

export const carTargetFn = (): ObjectType<Car> => Car;

export const carInverseSideFn = (car: Car): Rental[] => car.rental;

export const driverTargetFn = (): ObjectType<Driver> => Driver;

export const driverInverseSideFn = (driver: Driver): Rental[] => driver.rental;
@Entity()
export class Rental {
  @Title("Rental's id")
  @Description("The id of the rental.")
  @Example("1")
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Title("Rental's start date")
  @Description("The start date of the rental. Use ISO 8601 format.")
  @Example("2011-10-05T14:48:00.000Z")
  @Column()
  @Minimum(24)
  @Maximum(27)
  @Required()
  startDate: string;

  @Title("Rental's end date")
  @Description("The start end of the rental. Use ISO 8601 format.")
  @Example("2012-10-05T14:48:00.000Z")
  @Column({nullable: true})
  @Minimum(24)
  @Maximum(27)
  endDate: string;

  @Column({nullable: true})
  @Minimum(0)
  @Maximum(255)
  motive: string;

  @ManyToOne(carTargetFn, carInverseSideFn, {nullable: true})
  @JoinColumn()
  @Required()
  car!: Car;

  @ManyToOne(driverTargetFn, driverInverseSideFn, {nullable: true})
  @JoinColumn()
  @Required()
  driver!: Driver;
}
