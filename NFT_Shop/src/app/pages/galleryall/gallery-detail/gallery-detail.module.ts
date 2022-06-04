import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryDetailPageRoutingModule } from './gallery-detail-routing.module';

import { GalleryDetailPage } from './gallery-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryDetailPageRoutingModule
  ],
  declarations: [GalleryDetailPage]
})
export class GalleryDetailPageModule {}
