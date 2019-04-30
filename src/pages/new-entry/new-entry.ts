import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  entryForm: FormGroup;

  entry = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private builder: FormBuilder) {

      this.entryForm = builder.group({
        amount: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.required),
      });
    }

  ionViewDidLoad() { }

  submitForm() {
    console.log('Enviando dados..');
    console.log(JSON.stringify(this.entry));
    this.navCtrl.pop();
  }

  goBack() {
    console.log('Cancelando...');
    this.navCtrl.pop();
  }
}
