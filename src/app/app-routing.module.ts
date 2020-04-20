import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { MonitorComponent } from './views/monitor/monitor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'monitor', component: MonitorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
