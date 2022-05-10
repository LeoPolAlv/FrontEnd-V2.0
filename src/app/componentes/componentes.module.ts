import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaComponent } from './reserva/reserva.component';
import { DatosreservaComponent } from './datosreserva/datosreserva.component';
import { AltareservaComponent } from './altareserva/altareserva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ReservasComponent,
    ReservaComponent,
    DatosreservaComponent,
    AltareservaComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReservasComponent,
    ReservaComponent,
    DatosreservaComponent,
    AltareservaComponent,
  ]
})
export class ComponentesModule { }
