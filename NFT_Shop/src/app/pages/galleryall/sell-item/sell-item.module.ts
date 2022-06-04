import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellItemPageRoutingModule } from './sell-item-routing.module';

import { SellItemPage } from './sell-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellItemPageRoutingModule
  ],
  declarations: [SellItemPage]
})
export class SellItemPageModule {}
