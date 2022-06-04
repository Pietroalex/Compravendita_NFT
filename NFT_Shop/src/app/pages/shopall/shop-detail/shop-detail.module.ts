import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopDetailPageRoutingModule } from './shop-detail-routing.module';

import { ShopDetailPage } from './shop-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopDetailPageRoutingModule
  ],
  declarations: [ShopDetailPage]
})
export class ShopDetailPageModule {}
