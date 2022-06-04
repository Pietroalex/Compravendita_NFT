import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftPurchasedPageRoutingModule } from './nft-purchased-routing.module';

import { NftPurchasedPage } from './nft-purchased.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftPurchasedPageRoutingModule
  ],
  declarations: [NftPurchasedPage]
})
export class NftPurchasedPageModule {}
