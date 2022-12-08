import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessageSpec } from '@/models';

@Component({
  standalone: true,
  selector: 'app-messages-table-mobile-view',
  templateUrl: './messages-table-mobile-view.component.html',
  styleUrls: ['../messages.component.scss', './messages-table-mobile-view.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class MessagesTableMobileViewComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<MessageSpec>;

  @Output() openMessage = new EventEmitter<MessageSpec>();

  public mobileColumnsToDisplay: string[] = ['informations', 'actions'];

  constructor() {
  }

  ngOnInit() {
  }

  public showMessage(messageSpec: MessageSpec) {
    this.openMessage.emit(messageSpec);
  }

}
