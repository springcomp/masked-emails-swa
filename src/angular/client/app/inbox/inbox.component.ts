import { Component, OnInit } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';

@Component({
  standalone: true,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  imports: [MessagesComponent],
})
export class InboxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
