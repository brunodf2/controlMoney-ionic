import { Component, Input } from '@angular/core';

/**
 * Generated class for the EntryListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entry-list',
  templateUrl: 'entry-list.html'
})
export class EntryListComponent {
  @Input() entries;

  constructor() { }

}
