import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { MessageSpec, Message } from '../../shared/models/model';

@Component({
  standalone: true,
  selector: 'app-message-content-view',
  templateUrl: './message-content-view.component.html',
  styleUrls: ['./message-content-view.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ]
})
export class MessageContentViewComponent implements OnInit {
  @Input() messageSpec: MessageSpec;
  @Input() messageContent: Message;
  @Input() loadingMessage: boolean;

  @Output() closeSidenav = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public getMessageBody(): string {
    if (this.messageContent != null) {
      var html = this.messageContent.htmlBody;
      var text = this.messageContent.textBody;

      if (html) {
        return html;
      }
      return text;
    }
    return "";
  }

  public close() {
    this.closeSidenav.emit();
  }

}
