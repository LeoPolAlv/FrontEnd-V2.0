import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, iosTransitionAnimation, ModalController, NavController } from '@ionic/angular';
import { Reserva } from '../../interfaces/interfaces';
import { Inject } from '@angular/core';    
import { DOCUMENT } from '@angular/common';
import { ReservasService } from 'src/app/services/reservas.service';
import { DatosreservaComponent } from '../datosreserva/datosreserva.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {

  @Input() reserva: Reserva;
  @Input() i;

  private indice: number;

  constructor(private modalController: ModalController,
              public actionSheetController: ActionSheetController,
              public reservasService: ReservasService,
              public alertController: AlertController,
              private navctl: NavController,
              @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
   // console.log("Reserva en reserva.Html: ", this.reserva);
    //console.log("Indice trasmitido: ", this.i);
    this.indice = this.i + 1;
  }

  async openReserva() {
    const modal = await this.modalController.create({
      component: DatosreservaComponent,
     // cssClass: 'my-custom-class',
      componentProps: {
        'reserva': this.reserva,
      }
    });
    return await modal.present();
    //console.log('Open datos reserva. En elaboracion');
  }

  eliminarReserva(idReserva:number){
    this.reservasService.bajaReserva(idReserva)
          .subscribe({
            next: async (resp) =>{
              //console.log('Respuesta baja reserva: ', resp);
              await this.presentAlert("Reserva Cancelada");
              this.reservasService.nuevaReserva.emit(resp.toLocaleString());
            },
            error: (err) => {
              console.log('Error baja reserva: ', err)
              this.presentAlert(`Reserva ${idReserva} NO puede ser cancelada. ${err}`); 
            } 
          });
  }

  async presentActionSheet(reserva) {
    const actionSheet = await this.actionSheetController.create({
      //header: 'Albums',
      //cssClass: 'my-custom-class',
      animated: true,  
      mode: "ios",
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data:  'delete',
        handler: () => {
          console.log('Delete clicked');
          console.log('Id a borrar: ',reserva);

        }
      }, {
        text: 'Detalle',
        icon: 'add-circle-outline', 
        data: 'reserva',
        handler: () => {
          //console.log('Share clicked');
          this.openReserva();
        }
      }]
    });
    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role and data', data);
    if(data === 'delete'){
      console.log('Vamos a borrar el elemento');
      this.eliminarReserva(reserva.idReserva);
    }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Subtitle',
      message: mensaje,
      buttons: [{
        text: "OK",
        handler: () => {
          this.document.location.reload();
        }

      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
