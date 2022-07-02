import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftSoldPageRoutingModule } from './nft-sold-routing.module';

import { NftSoldPage } from './nft-sold.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NftSoldPageRoutingModule
  ],
  declarations: [NftSoldPage]
})
export class NftSoldPageModule {}
