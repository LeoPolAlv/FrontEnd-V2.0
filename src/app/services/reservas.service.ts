import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AltaReserva, Reserva } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  //Declaramos un evento que se lanzara cada vez que se cree una nueva reserva.
  public nuevaReserva: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  public findUser(username: string){  
    return this.http.get(`${URL}/reserva/find/${username}`);
  }

  public findRoom(idReserva: number): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${URL}/reserva/find/ + ${idReserva}`);
  }


  public findHorasLibres(sala: string, fechaReserva: string){
    return this.http.get(`${URL}/tramoshoras/free/${sala}/${fechaReserva}`);
  }


  public altaReserva(reserva: AltaReserva){
    let url = `${URL}/reserva/new`;
    return this.http.post(url,reserva);
  }

  public bajaReserva(idReserva: number){
    let url = `${URL}/reserva/delete/${idReserva}`
   // return new Promise((resolve,reject) => {
    return this.http.delete(url);
     /*     .subscribe (
            resp => { 
              console.log("Respuesta borrado reserva: ", resp);
              resolve(resp);
            },
            error =>{
              console.log("Error respuesta borrado reserva: ", error);
              reject(error);
            })
    })*/
    
  }
}
