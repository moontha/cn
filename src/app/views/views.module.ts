import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { TimeComponent } from './time/time.component';
import { MonitorComponent } from './monitor/monitor.component';
import { CutComponent } from './cut/cut.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderComponent } from './order/order.component';
import { InfoComponent } from './info/info.component';
import { LastorderComponent } from './lastorder/lastorder.component';
import { AdminorderComponent } from './adminorder/adminorder.component';
import { VieworderComponent } from './vieworder/vieworder.component';

@NgModule({
  declarations: [
    TimeComponent,
    MonitorComponent,
    CutComponent,
    OrderComponent,
    InfoComponent,
    LastorderComponent,
    AdminorderComponent,
    VieworderComponent
  ],
  imports: [
    ViewsRoutingModule,
    FormsModule,
    CommonModule,
    Ng2SearchPipeModule
  ]
})
export class ViewsModule { }
