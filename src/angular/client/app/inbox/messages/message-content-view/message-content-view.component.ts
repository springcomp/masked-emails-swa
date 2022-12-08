import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { MessageSpec, Message } from '@/models';

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
  ],
})
export class MessageContentViewComponent {
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
