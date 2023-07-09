import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ordereditems',
  templateUrl: './ordereditems.component.html',
  styleUrls: ['./ordereditems.component.css']
})
export class OrdereditemsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
