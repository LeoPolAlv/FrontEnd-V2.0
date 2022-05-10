import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SwiperModule } from 'swiper/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { ShareModule } from '../share/share.module';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    ShareModule,
    ComponentesModule,
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
