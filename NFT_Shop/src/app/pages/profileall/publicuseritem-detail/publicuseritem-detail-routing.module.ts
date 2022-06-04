import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicuseritemDetailPage } from './publicuseritem-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PublicuseritemDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicuseritemDetailPageRoutingModule {}
