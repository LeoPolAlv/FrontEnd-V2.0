import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http:HttpClient,
  ) { }

  public findPaises(){
    return this.http.get(`${URL}/pais/all`);
  }
}
