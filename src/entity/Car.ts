import {Description, Example, Maximum, MaxLength, Minimum, Property, Required, Title} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Rental} from "./Rental";

@Entity()
export class Car {
  @Title("Id")
  @Description("Car id")
  @Example("1")
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

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

  @OneToMany(() => Rental, (rental) => rental.car)
  public rental!: Car[];
}
