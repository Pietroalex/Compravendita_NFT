import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Edit_profilePage } from './edit_profile.page';

const routes: Routes = [
  {
    path: '',
    component: Edit_profilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
