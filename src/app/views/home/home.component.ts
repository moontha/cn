import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  user;
  logOutModal = false;
  
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe(guser => {
      this.user = guser;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(){
    this.logOutModal = false;
    this.auth.signOut();
    this.router.navigate(['/login']);

  }

  askLogout(){
    this.logOutModal = true;
  }

  noLogout(){
    this.logOutModal = false;
  }
}