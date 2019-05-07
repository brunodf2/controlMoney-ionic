import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { NewEntryPage } from "../new-entry/new-entry";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  entries = [];

  constructor(
    public navCtrl: NavController,
    public database: DatabaseProvider
  ) {}

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log("Adicionar lançamento");
    this.navCtrl.push(NewEntryPage);
  }

  loadData() {
    console.log("Início do Teste DB");

    const sql = "SELECT * FROM entries;";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((values: any) => {
        let data;
        this.entries = [];

        for (var i = 0; i < values.rows.length; i++) {
          data = values.rows.item(i);
          console.log(JSON.stringify(data));
          this.entries.push(data);
        }
      })
      .catch(e =>
        console.error("erro ao selecionar registros", JSON.stringify(e))
      );
  }
}
