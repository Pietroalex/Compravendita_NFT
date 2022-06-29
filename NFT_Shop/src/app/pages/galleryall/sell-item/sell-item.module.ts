import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellItemPageRoutingModule } from './sell-item-routing.module';

import { SellItemPage } from './sell-item.page';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    SellItemPageRoutingModule
  ],
  declarations: [SellItemPage]
})
export class SellItemPageModule {}
