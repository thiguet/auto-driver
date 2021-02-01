import {Description, Example, MaxLength, Property, Required, Title} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Rental} from "./Rental";

@Entity()
export class Driver {
  @Title("Driver's id")
  @Description("The id of the driver.")
  @Example("1")
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Title("Driver's name")
  @Description("The name of the driver.")
  @Example("Mary")
  @Column()
  @MaxLength(255)
  @Required()
  name: string;

  @OneToMany(() => Rental, (rental) => rental.car)
  rental!: Rental[];
}
