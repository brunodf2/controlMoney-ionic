import { NgModule } from '@angular/core';
import { BalancePanelComponent } from './balance-panel/balance-panel';

import { IonicPageModule } from 'ionic-angular'
import { EntrySumaryComponent } from './entry-sumary/entry-sumary';
import { EntryListComponent } from './entry-list/entry-list';

@NgModule({
	declarations: [BalancePanelComponent,
    EntrySumaryComponent,
    EntryListComponent],
	imports: [
		IonicPageModule
	],
	exports: [
	BalancePanelComponent,
	EntrySumaryComponent,
    EntryListComponent
]
})
export class ComponentsModule {}
