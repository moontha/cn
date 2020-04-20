import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TimeComponent } from './time/time.component';
import { CutComponent } from './cut/cut.component';
import { OrderComponent } from './order/order.component';
import { InfoComponent } from './info/info.component';
import { AdminorderComponent } from './adminorder/adminorder.component';


const routes: Routes = [
  { path: 'time', component: TimeComponent, canActivate: [AuthGuard]},
  { path: 'cut', component: CutComponent, canActivate: [AuthGuard]},
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
  { path: 'adminorder', component: AdminorderComponent, canActivate: [AuthGuard]},
  { path: '', component: InfoComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
