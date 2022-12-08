import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class MessageContentMobileViewComponent {
  @Input() messageSpec!: MessageSpec;
  @Input() messageContent?: Message;
  @Input() loadingMessage = false;

  @Output() closeSidenav = new EventEmitter();

  public getMessageBody(): string {
    if (this.messageContent) {
      const html = this.messageContent.htmlBody;
      const text = this.messageContent.textBody;

      return html ?? text ?? '';
    }
    return '';
  }

  public close() {
    this.closeSidenav.emit();
  }
}
