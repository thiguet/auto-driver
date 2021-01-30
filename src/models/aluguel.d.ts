import {Automovel} from "./automovel";
import {Motorista} from "./motorista";

export interface Aluguel {
  dtIni: string;
  dtFin: string;
  motorista: Motorista;
  automovel: Automovel;
  motivo: string;
}
