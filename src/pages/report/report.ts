import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountProvider } from '../../providers/account/account';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  entriesByCategory = [];
  lastEntries = [];

  dateButtonLabel = 'Últimos 7 dias';
  categoryButtonLabel = 'Todas Categorias';

  currentBalance = 10.56;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public account: AccountProvider) {}

  ionViewDidLoad() {
    this.loadData();
  }

  dismiss() {
    console.log('report: dismiss...');
    this.navCtrl.pop();
  }

  private loadData() {
    this.loadBalancesByCategory();
    this.loadLastEntries();
  }

  private loadBalancesByCategory() {
    this.account.lastEntriesByCategory(-7)
      .then((data: any) => this.entriesByCategory = data);
  }

  // Carrega os lançamentos
  private loadLastEntries() {
    this.account
      .lastEntries(-7)
        .then((data: any) => {
          this.lastEntries = data;
        });
  }
}
