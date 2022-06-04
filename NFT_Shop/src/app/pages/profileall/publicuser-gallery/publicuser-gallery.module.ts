import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuserGalleryPageRoutingModule } from './publicuser-gallery-routing.module';

import { PublicuserGalleryPage } from './publicuser-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicuserGalleryPageRoutingModule
  ],
  declarations: [PublicuserGalleryPage]
})
export class PublicuserGalleryPageModule {}
