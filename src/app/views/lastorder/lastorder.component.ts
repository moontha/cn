import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-lastorder',
  templateUrl: './lastorder.component.html',
  styleUrls: ['./lastorder.component.css']
})
export class LastorderComponent implements OnInit {
  @Input() place='';
  weekdata;
  openedItemIndex = 0;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.weekdata = this.orderService.getWeekOrder(this.place);
  }

  setActive(index: number){
    if(this.openedItemIndex === index){
      this.openedItemIndex = -1;
    } else {
      this.openedItemIndex = index;
    }
  }

}
