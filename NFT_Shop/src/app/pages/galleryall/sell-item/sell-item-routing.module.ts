import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellItemPage } from './sell-item.page';

const routes: Routes = [
  {
    path: '',
    component: SellItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellItemPageRoutingModule {}
