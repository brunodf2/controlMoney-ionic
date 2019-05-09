import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { NewEntryPage } from "../new-entry/new-entry";
import { AccountProvider } from "../../providers/account/account";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  entries = [];

  constructor(public navCtrl: NavController, public account: AccountProvider) {}

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log("Adicionar lançamento");
    this.navCtrl.push(NewEntryPage);
  }

  loadData() {
    this.account.allEntries().then((values: any) => {
      let data;
      this.entries = [];

      for (var i = 0; i < values.rows.length; i++) {
        data = values.rows.item(i);
        console.log(JSON.stringify(data));
        this.entries.push(data);
      }
    });
  }
}
