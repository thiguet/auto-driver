import {Description, Example, MaxLength, Property, Required, Title} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ObjectType} from "typeorm";
import {Rental} from "./Rental";

export const targetFn = (): ObjectType<Rental> => Rental;

export const inverseSideFn = (rental: Rental): Driver => rental.driver;

export class NewDriver {
  @Title("Driver's name")
  @Description("The name of the driver.")
  @Example("Mary")
  @Column()
  @MaxLength(255)
  @Required()
  name: string;

  @OneToMany(targetFn, inverseSideFn)
  rental!: Rental[];
}

@Entity()
export class Driver extends NewDriver {
  @Title("Driver's id")
  @Description("The id of the driver.")
  @Example("1")
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;
}
