import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftSoldPageRoutingModule } from './nft-sold-routing.module';

import { NftSoldPage } from './nft-sold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftSoldPageRoutingModule
  ],
  declarations: [NftSoldPage]
})
export class NftSoldPageModule {}
