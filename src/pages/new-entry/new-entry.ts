import { EntryDaoProvider } from "./../../providers/entry-dao/entry-dao";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-new-entry",
  templateUrl: "new-entry.html"
})
export class NewEntryPage {
  categories = [];
  entryForm: FormGroup;

  entry = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseProvider,
    public entryDao: EntryDaoProvider,
    private builder: FormBuilder
  ) {
    this.entryForm = builder.group({
      amount: new FormControl("", Validators.required),
      category_id: new FormControl("", Validators.required)
    });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  submitForm() {
    console.log("Enviando dados..");
    console.log(JSON.stringify(this.entry));
    this.insertBD();
    this.navCtrl.pop();
  }

  goBack() {
    console.log("Cancelando...");
    this.navCtrl.pop();
  }

  insertBD() {
    this.entryDao.insert(this.entry).then(() => {
      console.log("Registro inserido");
    });
  }

  loadData() {
    console.log("Início do Teste DB");

    const sql = "SELECT * FROM categories;";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((values: any) => {
        let data;
        this.categories = [];

        for (var i = 0; i < values.rows.length; i++) {
          data = values.rows.item(i);
          console.log(JSON.stringify(data));
          this.categories.push(data);
        }
      })
      .catch(e =>
        console.error("erro ao selecionar registros", JSON.stringify(e))
      );
  }
}
