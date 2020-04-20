import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  atWork$;

  constructor(
    private dbService: DbService
  ) { }

  ngOnInit() {
    this.atWork$ = this.dbService.monitor(new Date);
  }

}
