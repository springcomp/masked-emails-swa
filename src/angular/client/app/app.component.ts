import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';

import { AuthService } from './core/auth.service';
import { LoaderService } from '@/services';
import { ScrollService } from '@/services';

import { AppContainerComponent } from './app-container/app-container.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ScrollEvent } from '@/models';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    AppContainerComponent,
    LoadingScreenComponent,
  ],
})
export class AppComponent {
  @ViewChild('scrollMe', { static: true })
  private myScrollContainer: ElementRef;

  public lock: boolean;
  constructor(
    public authService: AuthService,
    public loaderService: LoaderService,
    private scrollService: ScrollService
  ) {}

  onScroll(event: ScrollEvent) {
    if (!this.lock) {
      this.lock = true;
      this.scrollService.isScrolledToBottom(event);

      setTimeout(() => {
        if (this.scrollService.scrollToBottom)
          this.myScrollContainer.nativeElement.scrollTop =
            this.myScrollContainer.nativeElement.scrollHeight;
      });

      this.lock = false;
    }
  }
}
