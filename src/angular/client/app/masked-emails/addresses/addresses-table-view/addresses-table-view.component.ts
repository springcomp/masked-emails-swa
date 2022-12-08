import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaskedEmail } from '@/models';

@Component({
  standalone: true,
  selector: 'app-addresses-table-view',
  templateUrl: './addresses-table-view.component.html',
  styleUrls: [
    '../addresses.component.scss',
    './addresses-table-view.component.scss',
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,

    MatButtonModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
})
export class AddressesTableViewComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<MaskedEmail>;

  @Output() updateAddress = new EventEmitter<MaskedEmail>();
  @Output() deleteAddress = new EventEmitter<MaskedEmail>();
  @Output() checkAddress = new EventEmitter();
  @Output() copyToClipboard = new EventEmitter();
  @Output() sort = new EventEmitter();

  public displayedColumns: string[] = [
    'name',
    'address',
    'description',
    'enabled',
    'actions',
  ];
  constructor() {}

  ngOnInit() {}

  public sorting(sort: { active: string; direction: string }) {
    let sortingMode = null;
    if (sort.direction === '') sortingMode = null;
    else {
      if (sort.direction === 'desc')
        sortingMode = sort.active + '-' + sort.direction;
      else sortingMode = sort.active;
    }

    this.sort.emit(sortingMode);
  }

  public openUpdateDialog(address: MaskedEmail) {
    this.updateAddress.emit(address);
  }

  public openRemoveDialog(address: MaskedEmail) {
    this.deleteAddress.emit(address);
  }

  public onToggleChecked(address: MaskedEmail, $event) {
    this.checkAddress.emit({ address, $event });
  }

  public copy(email: string) {
    this.copyToClipboard.emit(email);
  }
}
