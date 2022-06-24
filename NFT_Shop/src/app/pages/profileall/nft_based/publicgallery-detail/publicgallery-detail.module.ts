import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuseritemDetailPageRoutingModule } from './publicgallery-detail-routing.module';

import { PublicgalleryDetailPage } from './publicgallery-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicuseritemDetailPageRoutingModule
  ],
  declarations: [PublicgalleryDetailPage]
})
export class PublicuseritemDetailPageModule {}
