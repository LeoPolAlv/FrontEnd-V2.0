import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Oficinas } from 'src/app/models/oficinas.models';
import { Pais } from 'src/app/models/pais.models';
import { OficinasService } from 'src/app/services/oficinas.service';
import { PaisService } from 'src/app/services/pais.service';
import { ReservasService } from '../../services/reservas.service';
import { Salas } from '../../models/salas.models';
import { AltaReserva } from 'src/app/interfaces/interfaces';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-altareserva',
  templateUrl: './altareserva.component.html',
  styleUrls: ['./altareserva.component.scss'],
})
export class AltareservaComponent implements OnInit {

  public currentDate: Date = new Date();
  public fechaMin: string = '';
  public fechaMax: string = '';
  
  public altaReservaForm: FormGroup;
  public altaReservaDTO: AltaReserva = {};

  public paisesAux: any;
  public paisSeleccionado: Pais;
  public oficinasPais: Oficinas[];
  public salas: Salas[];
  public salaSeleccionada: string;
  public fechaSeleccionada: string;
  public horasCambio: any;

  public dateValue: string;

  public tramosHoras: any;

  // Banderas de eleccion
  public paisSelecc: boolean = false;
  public oficinaSelec: boolean = false;
  public salaSelec: boolean = false;
  public fechaSelec: boolean = false;
  public horasSelec: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private reservaService: ReservasService,
    private alertController: AlertController,
    private oficinaService: OficinasService,
    private tokenService: TokenService,
  ) {
    
   }

  ngOnInit() {
    this.fechaMin = this.currentDate.toISOString();
    this.fechaMax = '2050-12-31';

    this.crearFormulario();
    this.buscarPaises();

    this.altaReservaForm.get('pais').valueChanges
        .subscribe((pais:string) =>{
          if (pais){
            console.log('Cambio valor pais');
            this.paisSelecc = false;

            this.altaReservaForm.get('oficina').setValue('');
            this.altaReservaForm.get('sala').setValue('');
            this.altaReservaForm.get('fechaReserva').setValue('');
            this.altaReservaForm.get('horasReserva').setValue('');

            this.paisSeleccionado = this.paisesAux.find(h => h.countryName === pais );
            this.cargarOficinas(this.paisSeleccionado);
            //console.log('Pais selecionado: ', this.paisSeleccionado);
          }
        });

    this.altaReservaForm.get('oficina').valueChanges
    .subscribe((oficina:any) =>{
      if (oficina) {
        console.log('Cambio valor oficina'); 
        this.oficinaSelec = false;
  
        this.altaReservaForm.get('sala').setValue('');
        this.altaReservaForm.get('fechaReserva').setValue('');
        this.altaReservaForm.get('horasReserva').setValue('');
  
        console.log('Oficina Seleccionada: ', oficina);
        if (oficina !== ''){
          this.cargaSalas(oficina);
        }
      }
    });

    this.altaReservaForm.get('sala').valueChanges
    .subscribe((sala: string) =>{
      //console.log('Cambio valor sala'); 
      //console.log('Valor de Sala: ', sala);
      if (sala) {
        this.salaSeleccionada = sala;
        //console.log('Valor de Sala: ', this.salaSeleccionada);
        this.salaSelec = false;
        if (sala){
          this.salaSelec = true;
        }
      }
    });
    
    this.altaReservaForm.get('fechaReserva').valueChanges
    .subscribe((fecha) => {
      //console.log('Fecha reserva seleccionada: ', fecha);
      this.fechaSelec = false
      if (fecha){
            console.log('Valor de Sala en horas libres: ', this.salaSeleccionada);
            this.fechaSeleccionada = fecha;
            this.formatDate(fecha);
            this.fechaSelec = true
            this.cargarHorasLibres(this.salaSeleccionada,this.fechaSeleccionada)
          }
        })
  }

  crearFormulario(){
    this.altaReservaForm = this.fb.group({
      pais:['', Validators.required],
      oficina:['', Validators.required],
      sala:['', Validators.required],
      fechaReserva:['', Validators.required],
      horasReserva:['', Validators.required]
    })
  }

  inicializarForm(){
    this.paisSelecc = false;
    this.oficinaSelec = false;
    this.salaSelec = false;
    this.fechaSelec = false;
    
    this.altaReservaForm.controls['pais'].setValue("");
    this.altaReservaForm.controls['oficina'].setValue("");
    this.altaReservaForm.controls['sala'].setValue("");
    this.altaReservaForm.controls['fechaReserva'].setValue("");
    this.altaReservaForm.controls['horasReserva'].setValue("");
  }

  buscarPaises(){
    this.paisService.findPaises().subscribe(paises => {
      this.paisesAux = paises;
      //console.log(this.paisesAux);
    },
    error =>{
      console.log("ERROR: ", error);
    });
  }

  cargarOficinas(paisSeleccionado: any){
    //console.log('Oficinas pais: ', paisSeleccionado);
    this.paisSelecc = true;
    this.oficinasPais = paisSeleccionado.offices;
  }

  cargaSalas(oficina: string){
    this.oficinaService.findSala(oficina).subscribe((salas: Salas[]) =>{
       //console.log("datos Salas por oficina: ", salas);
       if (salas.length === 0){
         this.presentAlert('Oficina sin salas asignadas');
         this.salas = null;
         //this.oficinaSelec = false
        } else {
          this.salas = salas
          this.oficinaSelec = true
        }
      //console.log("datos Salas por oficina despues: ", this.salas);
    });
  }

  formatDate(value: string){
    const fecha = value.split('T');
    const day = fecha[0].substring(8);
    const mes = fecha[0].substring(5,7);
    const anio = fecha[0].substring(0,4);
    
    this.dateValue = day + '-' + mes + '-' + anio;
  }

  cargarHorasLibres(sala: string, fechaReserva: string) {
    this.reservaService.findHorasLibres(sala,fechaReserva.split('T')[0])
         .subscribe(tramos => {
           console.log("Datos recibidos de tramos Horas: ", tramos);
           this.tramosHoras = tramos;
         });
  }

  cambioSelect(){
    console.log("horas selecciondas en formulario: ",this.altaReservaForm.controls['horasReserva'].value);
    this.horasCambio = this.altaReservaForm.controls['horasReserva'].value
  }

  altaReserva(){
    this.altaReservaDTO.dasUser = this.tokenService.usuarioConect;
    this.altaReservaDTO.roomName = this.salaSeleccionada;
    this.altaReservaDTO.fechaReserva = this.fechaSeleccionada;
    this.altaReservaDTO.tramos = this.horasCambio;

    this.reservaService.altaReserva(this.altaReservaDTO)
          .subscribe({
            next: async (resp) =>{
              let retorno = resp
              //console.log('Respuesta alta reserva: ', resp);
              let mensaje = `Reserva numero:  ${resp}  realizada correctamente`;
              await this.presentAlert( mensaje);
              //emitimos el evento para indicar que se creo una nueva reserva.
              this.inicializarForm();
              this.reservaService.nuevaReserva.emit(retorno.toLocaleString())
            },
            error: (err) => console.log('Error: ', err)
    });
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    //const { role } = await alert.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
  }
  
}
