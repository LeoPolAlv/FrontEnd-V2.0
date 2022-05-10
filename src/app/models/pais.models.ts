import { Oficinas } from "./oficinas.models";

export class Pais{
    public idPais: number;
    public countryName: string;
    public offices: Oficinas[];

    constructor(idPais:number, countryName: string, offices: any[]=[]){
        this.idPais = idPais;
        this.countryName = countryName;
        this.offices = offices;
    }
}