import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { MessageSpec, Message } from '@/models';
import { InboxService } from '@/services';

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

  constructor(
    private inboxService: InboxService
  ){}

  public getMessageBody(): string {
    if (this.messageContent) {
      const html = this.messageContent.htmlBody;
      const text = this.messageContent.textBody;

      return html ?? text ?? '';
    }
    return '';
  }

  public viewMessageSource(): string {
    const location = this.messageContent!.location;
    this.inboxService
      .getRawMessage(location)
      .subscribe((raw) => {
        const blob = new Blob([raw], { type: 'content-type: application/octet-stream'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "email.eml";
        link.click();
      });

    return '';
  }

  public close() {
    this.closeSidenav.emit();
  }
}
