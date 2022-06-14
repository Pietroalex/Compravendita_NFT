import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftSoldPage } from './nft-sold.page';

const routes: Routes = [
  {
    path: '',
    component: NftSoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftSoldPageRoutingModule {}
