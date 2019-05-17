import { NgModule } from '@angular/core';
import { BalancePanelComponent } from './balance-panel/balance-panel';

import { IonicPageModule } from 'ionic-angular'
import { EntrySumaryComponent } from './entry-sumary/entry-sumary';
import { EntryListComponent } from './entry-list/entry-list';
import { BalanceLabelComponent } from './balance-label/balance-label';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart';

@NgModule({
	declarations: [BalancePanelComponent,
    EntrySumaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent],
	imports: [
		IonicPageModule
	],
	exports: [
	BalancePanelComponent,
	EntrySumaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent
]
})
export class ComponentsModule {}
