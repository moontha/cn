import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PrintpdfService } from 'src/app/services/printpdf.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css']
})
export class AdminorderComponent implements OnInit {
  orders$;

  constructor(
    private orderService: OrderService,
    private printPdf: PrintpdfService
  ) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  deleteOrder(key: string, obj: Object){
    this.orderService.deleteOrder(key, obj);
  }

  printOrder(order){
    this.printPdf.printShopOrder(order);
  }

}
