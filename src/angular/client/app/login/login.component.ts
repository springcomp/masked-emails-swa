import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { LoaderService } from '@/services';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private loaderSvc: LoaderService
  ) {}

  async ngOnInit() {
    this.loaderSvc.startLoading();
    this.authService.login();
  }
}
