import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { Reserva } from '../interfaces/interfaces';
import { ReservasService } from '../services/reservas.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  host:{'class':'fondoContent'},
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  
  public usuario: string;
  public role: string;
  public type: number;

  public reservas: Reserva[] = [];


  constructor(
    private tokenService: TokenService,
    private reservasService: ReservasService,
  ) {
    console.log('Constructor - Home');
    //console.log('ROlE Home: ', tokenService.roleToken());
    //this.init();
    this.type = 0;
   }

  ngOnInit(): void {
    console.log('On Init- Home');
    //Observable que salta cuando tenemos nueva reserva realizada y asi refrescamos la info de las reservas hechas.
    this.reservasService.nuevaReserva
          .pipe(delay(100))
          .subscribe( () =>{
            this.init();
            this.type = 0;
    });

    // Observable que salta con el cambio de usuario
    this.tokenService.nuevoToken
          .subscribe(token => {
            console.log('Nuevo Token: ', token);
            this.usuario = this.tokenService.userToken(token);
            this.role = this.tokenService.roleToken(token);
    });

  } 
  
  ionViewWillEnter(){
    console.log('ionViewWillEnter - Home');
    //console.log('ROlE Home: ', this.tokenService.roleToken());
    this.init();
  }

  async init(){
    //this.usuario = await this.tokenService.userToken();
    console.log('Usuario- Home: ', this.usuario);
    if (!this.usuario) {
      let tokenAux = this.tokenService.getToken();
      this.usuario = this.tokenService.userToken(await tokenAux);
      this.role = this.tokenService.roleToken(await tokenAux);
      console.log('Usuario Obtenido - Home: ', this.usuario);
      console.log('Role Obtenido - Home: ', this.role);
    }

    this.buscoReservasUser();
  }

  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.type);  
  }  
  
  async slideChanged() {  
    this.type = await this.slider.getActiveIndex();  
  }  
  
  buscoReservasUser(){
    //console.log("Usuario en HOMEPage: ", this.usuario);
    this.reservasService.findUser(this.usuario)
          .subscribe((datos: Reserva[]) => {
            this.reservas = datos;
            //console.log("Reservas: ", this.reservas);
          });
  }

}
