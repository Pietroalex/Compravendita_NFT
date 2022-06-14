import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './edit_profile-routing.module';

import { Edit_profilePage } from './edit_profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationPageRoutingModule
  ],
  declarations: [Edit_profilePage]
})
export class RegistrationPageModule {}
