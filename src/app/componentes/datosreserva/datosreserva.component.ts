import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reserva } from 'src/app/interfaces/interfaces';

interface fechaReserva{
  fechaIni?: string;
  fechaFin?: string;
}


@Component({
  selector: 'app-datosreserva',
  templateUrl: './datosreserva.component.html',
  styleUrls: ['./datosreserva.component.scss'],   
})
export class DatosreservaComponent implements OnInit {

  @Input() reserva: Reserva;

  public horaInicioReserva: string[] = [];
  public horaReserva: fechaReserva[] = [];
  public horaAux: fechaReserva = {};

  constructor(private modalController: ModalController
    ) { }

  ngOnInit() {
    //console.log("Reserva recibida en modal: ", this.reserva);

    this.formateoHoraFin();
  }

  formateoHoraFin(){

    let longitud = this.reserva.horasReservas.length;
    //console.log("Longitud array horas: ", longitud);
    //this.horaInicioReserva = this.reserva.horasReservas;
    //console.log("Horas de entrada: ", this.reserva.horasReservas);


    for (let index = 0; index < this.reserva.horasReservas.length; index++) {
      //console.log("hora Inicio: ",this.reserva.horasReservas[index]);
      this.horaAux = {};
      this.horaAux['fechaIni'] = this.reserva.horasReservas[index];
      this.calculoHoras(this.reserva.horasReservas[index], index);
      //console.log("HorasAux: ", this.horaAux);
      this.horaReserva.push(this.horaAux);
    }
    //console.log("Horas fin calculadas: ", this.horaReserva);
  }

  /*
    Funcion qe te calcula las horas fin de cada reserva a partir de las horas  
    de inicio que se le pasan
  */
  calculoHoras(horaInicio: string, ind: number){
    let horasAux = '';
    let minutos = '';

    //console.log("Hora Inicio enviada a funcion: ", horaInicio);
    horasAux = horaInicio.split(":")[0]
    let horas = parseInt(horasAux);
    //console.log("Hora Seleccionada: ", horas);
    //cogemos la parte de los minutos. Split divide una cadena en elementos de array
    minutos = horaInicio.split(":")[1];
    //let minutos = parseInt(minutoAux);
    //console.log("Minutos seleccionados: ", minutos);

    if(minutos === '00'){
      //console.log("Entro por minutos");
        minutos = '30'; 
        //minutoAux = minutos.toString();
        //console.log("minutosAux: ", minutos);
    } else {
      //console.log("Entro por horas");
      horas = horas + 1;
      horasAux = horas.toString();
      minutos = '00';
    }
    let horaFinCalc = horasAux + ':' + minutos;

    //this.horaFinReserva.push(horaFinCalc);
    this.horaAux['fechaFin'] = horaFinCalc;
    //console.log("Fecha Fin informada: ", horaFinCalc);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
