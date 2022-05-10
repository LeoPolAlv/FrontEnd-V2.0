import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reserva } from '../../interfaces/interfaces';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {

  @Input() reservas: Reserva[];

  constructor()  {}

  ngOnInit() {
  }

}
