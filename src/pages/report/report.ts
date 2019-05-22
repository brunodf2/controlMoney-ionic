import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { DatePicker } from "@ionic-native/date-picker/ngx";

import { AccountProvider } from "../../providers/account/account";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  entriesByCategory = [];
  lastEntries = [];

  dateButtonLabel = "Últimos 7 dias";
  categoryButtonLabel = "Todas Categorias";

  currentBalance = 0;
  date = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datePicker: DatePicker,
    public account: AccountProvider
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  selectDate() {
    this.datePicker
      .show({
        date: this.date,
        mode: "date",
        titleText: "Selecione uma data",
        okText: "Ok",
        cancelText: "Cancelar",
        todayText: "Hoje",
        nowText: "Agora",
        locale: "pt_BR",
        is24Hour: true,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
      })
      .then(date => {
        console.log("Datepicker");
        console.log(date);
      });
  }

  dismiss() {
    console.log("report: dismiss...");
    this.navCtrl.pop();
  }

  private loadData() {
    this.loadBalance();
    this.loadBalancesByCategory();
    this.loadLastEntries();
  }

  private loadBalance() {
    this.currentBalance = this.account.currentBalance();
  }

  private loadBalancesByCategory() {
    this.account
      .lastEntriesByCategory(-7)
      .then((data: any) => (this.entriesByCategory = data));
  }

  // Carrega os lançamentos
  private loadLastEntries() {
    this.account.lastEntries(-7).then((data: any) => {
      this.lastEntries = data;
    });
  }
}
