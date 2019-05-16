import { Component } from '@angular/core';

/**
 * Generated class for the EntrySumaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entry-sumary',
  templateUrl: 'entry-sumary.html'
})
export class EntrySumaryComponent {

  text: string;

  constructor() {
    console.log('Hello EntrySumaryComponent Component');
    this.text = 'Hello World';
  }

}
