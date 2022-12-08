import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '@/services';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  public loading = false;
  public loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoaderService) {}

  ngOnInit() {
    this.loadingSubscription =
      this.loadingScreenService.loadingStatus.subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
