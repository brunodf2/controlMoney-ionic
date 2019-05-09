import { CategoryDaoProvider } from "./../../providers/category-dao/category-dao";
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
import { AccountProvider } from "../../providers/account/account";

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
    public categoryDao: CategoryDaoProvider,
    public account: AccountProvider,
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
    this.account
      .addEntry(this.entry["amount"], this.entry["category_id"])
      .then(() => console.log("Registro inserido"));
  }

  loadData() {
    this.categoryDao.getAll().then((data: any[]) => (this.categories = data));
  }
}
