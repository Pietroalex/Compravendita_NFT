import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseDetailPageRoutingModule } from './purchase-detail-routing.module';

import { PurchaseDetailPage } from './purchase-detail.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PurchaseDetailPageRoutingModule
  ],
  declarations: [PurchaseDetailPage]
})
export class PurchaseDetailPageModule {}
