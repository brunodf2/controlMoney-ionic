import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEntryPage } from './new-entry';

import {ComponentsModule} from '../../components/components.module'
import { CurrencyMaskModule } from "ng2-currency-mask";


@NgModule({
  declarations: [
    NewEntryPage,
  ],
  imports: [
    CurrencyMaskModule,
    ComponentsModule,
    IonicPageModule.forChild(NewEntryPage),
  ],
})
export class NewEntryPageModule {}
