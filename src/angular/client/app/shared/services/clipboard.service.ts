import { Injectable } from "@angular/core";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

	constructor(
		private clipboard: Clipboard,
		private snackBar: MatSnackBar) {
		{ }
	}

  public copyToClipboard(text: string, notification: string, title: string = null, duration: number = 2000): void {
    this.clipboard.copy(text);
    this.snackBar.open(notification, title ?? 'Undo', {
      duration: duration
    });
  }
}
