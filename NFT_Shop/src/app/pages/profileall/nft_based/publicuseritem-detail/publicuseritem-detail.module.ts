import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuseritemDetailPageRoutingModule } from './publicuseritem-detail-routing.module';

import { PublicuseritemDetailPage } from './publicuseritem-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicuseritemDetailPageRoutingModule
  ],
  declarations: [PublicuseritemDetailPage]
})
export class PublicuseritemDetailPageModule {}
