import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicgalleryDetailPage } from './publicgallery-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PublicgalleryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicuseritemDetailPageRoutingModule {}
