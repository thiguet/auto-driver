import {Description, Example, Maximum, MaxLength, Minimum, Property, Required, Title} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ObjectType} from "typeorm";
import {Rental} from "./Rental";

export const targetFn = (): ObjectType<Rental> => Rental;

export const inverseSideFn = (rental: Rental): Car => rental.car;

export class NewCar {
  @Title("Plate")
  @Description("The plate of the car. Up to 7 digits only.")
  @Example("ASD1456")
  @Column()
  @Minimum(7)
  @Maximum(7)
  @Required()
  plate: string;

  @Title("Color")
  @Description("The car color.")
  @Example("Black")
  @Column()
  @MaxLength(100)
  @Required()
  color: string;

  @Title("Brand")
  @Description("The car's brand.")
  @Example("Fiat")
  @Column()
  @MaxLength(100)
  @Required()
  brand: string;

  @OneToMany(targetFn, inverseSideFn)
  rental!: Rental[];
}
@Entity()
export class Car extends NewCar {
  @Title("Id")
  @Description("Car id")
  @Example("1")
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;
}
