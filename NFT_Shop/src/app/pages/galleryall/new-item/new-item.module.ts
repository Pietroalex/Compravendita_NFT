import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewItemPageRoutingModule } from './new-item-routing.module';

import { NewItemPage } from './new-item.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        TranslateModule,
        NewItemPageRoutingModule,

    ],
  declarations: [NewItemPage]
})
export class NewItemPageModule {}
