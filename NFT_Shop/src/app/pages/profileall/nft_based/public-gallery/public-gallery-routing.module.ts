import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicGalleryPage } from './public-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: PublicGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicuserGalleryPageRoutingModule {}
