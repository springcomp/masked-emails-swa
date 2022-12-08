import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

import { MaskedEmail } from '@/models';

@Component({
  standalone: true,
  selector: 'app-addresses-table-mobile-view',
  templateUrl: './addresses-table-mobile-view.component.html',
  styleUrls: [
    '../addresses.component.scss',
    './addresses-table-mobile-view.component.scss',
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
})
export class AddressesTableMobileViewComponent {
  @Input() dataSource: MatTableDataSource<MaskedEmail>;

  @Output() updateAddress = new EventEmitter<MaskedEmail>();
  @Output() deleteAddress = new EventEmitter<MaskedEmail>();
  @Output() checkAddress = new EventEmitter();
  @Output() copyToClipboard = new EventEmitter();
  @Output() sort = new EventEmitter();

  public expandedElement: MaskedEmail;

  public mobileColumnsToDisplay: string[] = ['informations', 'actions'];

  public sorting(sort: { active: string; direction: string }) {
    let sortingMode: string | null = null;
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
