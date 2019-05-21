import { NgModule } from '@angular/core';
import { BalancePanelComponent } from './balance-panel/balance-panel';

import { IonicPageModule } from 'ionic-angular'
import { EntrySumaryComponent } from './entry-sumary/entry-sumary';
import { EntryListComponent } from './entry-list/entry-list';
import { BalanceLabelComponent } from './balance-label/balance-label';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart';
import { BalancePanelChartComponent } from './balance-panel-chart/balance-panel-chart';

@NgModule({
	declarations: [BalancePanelComponent,
    EntrySumaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent,
    BalancePanelChartComponent],
	imports: [
		IonicPageModule
	],
	exports: [
	BalancePanelComponent,
	EntrySumaryComponent,
    EntryListComponent,
    BalanceLabelComponent,
    DoughnutChartComponent,
    BalancePanelChartComponent
]
})
export class ComponentsModule {}
