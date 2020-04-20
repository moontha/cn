import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utility } from '../models/util.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PrintpdfService {

  constructor(
    private util: Utility
  ) {
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
      }
    };
  }

  printClientOrder(shopname: string, orders: any, user: any) {
    const timeref = this.util.getTimeToday();
    const docDefinition = {
      content: this.getClientContent(shopname, orders, user, timeref),
      defaultStyle: {
        font: 'THSarabunNew'
      }
    };
    pdfMake.createPdf(docDefinition).download(`${shopname}-${timeref}`);
  }

  private getClientContent(shopname: string, orders: any, user: any, timeref: string) {
    let ret = [];
    const header = {
      text: shopname,
      style: 'header',
      bold: true
    };
    ret.push(header);
    // tslint:disable-next-line: forin
    const line = {
      text: `REF : ${timeref}     Maker : ${user.displayName}`,
      bold: true
    };
    ret.push(line);
    const ordertable = {
      layout: 'lightHorizontalLines', // optional
      table: {
        headerRows: 1,
        widths: ['auto', '*', '*', '*', '*'],
        body: this.getClientBody(orders),
      }
    }
    ret.push(ordertable);
    return ret;
  }

  private getClientBody(order) {
    let arr = [];
    arr.push([
      { text: '#', bold: true },
      { text: 'CODE', bold: true },
      { text: 'ชื่อสินค้า', bold: true },
      { text: 'จำนวน', bold: true },
      { text: 'หน่วยนับ', bold: true }
    ]);
    let count = 0;
    // tslint:disable-next-line: forin
    for (const o of order) {
      arr.push([++count, o.code, o.name, o.amount, o.unit]);
    }
    arr.push(['', '', '', '', '']);
    return arr;
  }




  printShopOrder(orders) {
    const timeref = this.util.getTimeToday();
    const docDefinition = {
      content: this.getShopContent(orders.key, orders.value),
      defaultStyle: {
        font: 'THSarabunNew'
      }
    };
    pdfMake.createPdf(docDefinition).download(`${orders.key}-${timeref}`);
  }

  private getShopContent(name, orders) {
    let ret = [];

    const header = {
      text: name,
      style: 'header',
      bold: true
    };
    ret.push(header);
    // tslint:disable-next-line: forin
    for (const order in orders) {
      const line = {
        text: `REF : ${order}     Maker : ${orders[order].username}`,
        bold: true
      };
      const table = {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*', '*'],
          body: this.getShopBody(orders[order].orderlist),
        }
      };
      ret.push(line);
      ret.push(table);
    }
    return ret;
  }

  private getShopBody(order) {
    let arr = [];
    arr.push([
      { text: '#', bold: true },
      { text: 'CODE', bold: true },
      { text: 'ชื่อสินค้า', bold: true },
      { text: 'จำนวน', bold: true },
      { text: 'หน่วยนับ', bold: true }
    ]);
    let count = 0;
    // tslint:disable-next-line: forin
    for (const o in order) {
      arr.push([++count, order[o].code, order[o].name, order[o].amount, order[o].unit]);
    }
    arr.push(['', '', '', '', '']);
    return arr;
  }
}
