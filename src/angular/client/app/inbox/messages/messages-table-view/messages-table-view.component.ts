import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SelectionModel } from '@angular/cdk/collections';

import { MessageSpec } from '@/models';

@Component({
  standalone: true,
  selector: 'app-messages-table-view',
  templateUrl: './messages-table-view.component.html',
  styleUrls: ['../messages.component.scss', './messages-table-view.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class MessagesTableViewComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<MessageSpec>;
  @Input() selection: SelectionModel<MessageSpec>;

  @Output() openMessage = new EventEmitter<MessageSpec>();

  public selectedRowIndex: any = null;
  public displayedColumns: string[] = ['received', 'sender', 'subject', 'actions'];

  constructor() { }

  ngOnInit() {
  }

  public showMessage(messageSpec: MessageSpec) {
    this.selection.clear();
    this.selection.select(messageSpec);

    this.openMessage.emit(messageSpec);
  }

}
