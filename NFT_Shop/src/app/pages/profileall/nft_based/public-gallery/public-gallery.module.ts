import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuserGalleryPageRoutingModule } from './public-gallery-routing.module';

import { PublicGalleryPage } from './public-gallery.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PublicuserGalleryPageRoutingModule
  ],
  declarations: [PublicGalleryPage]
})
export class PublicuserGalleryPageModule {}
