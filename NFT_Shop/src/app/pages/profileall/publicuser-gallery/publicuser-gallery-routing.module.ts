import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicuserGalleryPage } from './publicuser-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: PublicuserGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicuserGalleryPageRoutingModule {}
