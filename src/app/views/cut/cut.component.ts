import { Component, OnInit, ElementRef } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.css']
})
export class CutComponent implements OnInit {
  subscription: Subscription;

  term = '';
  place;
  shop;
  iproducts;
  gproducts;
  products;
  selectedProduct = [];
  amount: number;
  flagTerm = false;
  inputAmoutModal = false;
  deleteFromListModal = false;
  confirmSaveDbModal = false;
  currentProduct;
  currentIndex: number;

  user;
  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private dbService: DbService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(guser => {
      this.user = guser;
    });
    this.iproducts = this.orderService.getiProducts();
    this.gproducts = this.orderService.getgProducts();
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async loadType() {
    if (this.place.length === 2) {
      let name = this.place.split('');
      let text = '';
      text = name[0] + '0' + name[1];
      this.place = text;
    }
    this.place = this.place.toUpperCase();
    this.shop = await this.dbService.getShop(this.place);
    if (this.shop.type === 'cb') {
      this.products = this.gproducts;
    } else if (this.shop.type === 'in') {
      this.products = this.iproducts;
    } else {
      this.products = null;
    }
    this.flagTerm = true;
  }

  enList(product) {
    this.currentProduct = product;
    this.inputAmoutModal = true;
  }

  getInputAmount() {
    const form = {
      code: this.currentProduct.code,
      name: this.currentProduct.name,
      unit: this.currentProduct.unit,
      amount: this.amount
    }
    this.selectedProduct.push(form);
    this.inputAmoutModal = false;
    this.reset();
  }

  deleteFromList(index, product) {
    this.currentIndex = index;
    this.currentProduct = product;
    this.deleteFromListModal = true;
  }


  deleteProductFromList() {
    this.selectedProduct.splice(this.currentIndex, 1);
    this.deleteFromListModal = false;

  }

  noDelete() {
    this.deleteFromListModal = false;
  }

  reset() {
    this.term = '';
    this.amount = null;
  }

  askConfirmCut() {
    this.confirmSaveDbModal = true;
  }

  saveCut() {
    this.orderService.saveCut(this.place, this.selectedProduct, this.user);
    this.confirmSaveDbModal = false;
    this.selectedProduct = [];
  }

  noSave() {
    this.confirmSaveDbModal = false;
  }

}
