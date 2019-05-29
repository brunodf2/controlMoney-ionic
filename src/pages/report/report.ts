import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { DatePicker } from "@ionic-native/date-picker/ngx";

import { AccountProvider } from "../../providers/account/account";
import { DatePipe } from "@angular/common";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  entriesByCategory = [];
  lastEntries = [];

  currentBalance = 0;
  date = new Date();
  days = -7;

  dateButtonLabel = `Últimos ${this.days * -1} dias`;
  categoryButtonLabel = "Todas Categorias";

  datePipe = new DatePipe("en_US");

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
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
        this.date = date;

        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        const one_day = 1000 * 60 * 60 * 24;
        const date1_ms = today.getTime();
        const date2_ms = date.getTime();
        const difference_ms = date2_ms - date1_ms;

        this.days = Math.ceil(difference_ms / one_day);
        this.dateButtonLabel = this.datePipe.transform(date);

        this.loadValues();
      });
  }

  selectCategory() {
    let alert = this.alertCtrl.create({
      title: "Categorias",
      cssClass: "custom-alert"
    });

    //personalização
    alert.addButton('Cancelar');
    alert.addButton('OK');

    alert.present();
  }

  dismiss() {
    console.log("report: dismiss...");
    this.navCtrl.pop();
  }

  private loadData() {
    this.loadBalance();
    this.loadValues();
  }

  private loadValues() {
    this.loadBalancesByCategory();
    this.loadLastEntries();
  }

  private loadBalance() {
    this.currentBalance = this.account.currentBalance();
  }

  private loadBalancesByCategory() {
    this.account
      .lastEntriesByCategory(this.days)
      .then((data: any) => (this.entriesByCategory = data));
  }

  // Carrega os lançamentos
  private loadLastEntries() {
    this.account.lastEntries(this.days).then((data: any) => {
      this.lastEntries = data;
    });
  }
}
