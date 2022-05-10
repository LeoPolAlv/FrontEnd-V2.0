import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  constructor(private http: HttpClient) { }

  public findOficinas(){
    return this.http.get(`${URL}/oficinas/all`);
  }

  public findOficinasPorPais(paisName: string){
    return this.http.get(`${URL}/oficinas/country/${paisName}`);
  }

  public findSala(nombreOficina: string){
    return this.http.get(`${URL}/room/findrooms/${nombreOficina}`);
  }
}
