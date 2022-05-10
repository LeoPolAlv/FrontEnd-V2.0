export interface ResponseReservas{
    totalReservas: Reserva[];
}

export interface Reserva {
	idReserva: number;
    roomName: string;
    capacity: number;
    officeRoom: string;
	countryName:string;
    nombreEquipo: string[];
    fechaReserva: string;
    horasReservas: string[];
}

export interface AltaReserva {
    roomName?: string;
	dasUser?: string; 
	fechaReserva?: string;
	tramos?: string [];
}

export interface datosSala{
    roomName: string;
	capacity: number;
	oficina: string;
	equipamientos: any[];
	reservas: any[];
}

export interface datosEquipos{
    codigo: string;
	nombre: string;
	description: string;
	roomsEquipment: any;
}
