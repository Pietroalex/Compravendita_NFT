import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicuserProfilePage } from './publicuser-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PublicuserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicuserProfilePageRoutingModule {}
