import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuserProfilePageRoutingModule } from './publicuser-profile-routing.module';

import { PublicuserProfilePage } from './publicuser-profile.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PublicuserProfilePageRoutingModule
  ],
  declarations: [PublicuserProfilePage]
})
export class PublicuserProfilePageModule {}
