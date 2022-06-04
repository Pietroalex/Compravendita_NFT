import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicuserProfilePageRoutingModule } from './publicuser-profile-routing.module';

import { PublicuserProfilePage } from './publicuser-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicuserProfilePageRoutingModule
  ],
  declarations: [PublicuserProfilePage]
})
export class PublicuserProfilePageModule {}
