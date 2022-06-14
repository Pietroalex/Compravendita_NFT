import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftPurchasedPage } from './nft-purchased.page';

const routes: Routes = [
  {
    path: '',
    component: NftPurchasedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftPurchasedPageRoutingModule {}
