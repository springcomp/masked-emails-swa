import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MessageSpec, Message } from '@/models';

@Component({
  standalone: true,
  selector: 'app-message-content-mobile-view',
  templateUrl: './message-content-mobile-view.component.html',
  styleUrls: ['./message-content-mobile-view.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class MessageContentMobileViewComponent implements OnInit {
  @Input() messageSpec: MessageSpec;
  @Input() messageContent: Message;
  @Input() loadingMessage: boolean;

  @Output() closeSidenav = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public getMessageBody(): string {
    if (this.messageContent != null) {
      var html = this.messageContent.htmlBody;
      var text = this.messageContent.textBody;

      if (html) {
        return html;
      }
      return text;
    }
    return '';
  }

  public close() {
    this.closeSidenav.emit();
  }
}
