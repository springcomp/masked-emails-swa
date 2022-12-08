import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddressesComponent } from './addresses/addresses.component';

@Component({
  standalone: true,
  selector: 'app-masked-emails',
  templateUrl: './masked-emails.component.html',
  styleUrls: ['./masked-emails.component.scss'],
  imports: [
    AddressesComponent,
    MatSnackBarModule,
  ]
})

export class MaskedEmailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
