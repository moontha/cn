import { Injectable } from '@angular/core';
import { Utility } from '../models/util.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  gproduct = [];

  constructor(
    private db: AngularFirestore,
    private util: Utility
  ) { }

  //setup products
  storeProduct() {
    const batch = this.db.firestore.batch();
    for (let o of this.gproduct) {
      batch.set(this.db.doc(`iproduct/${o.code}`).ref, o, { merge: true });
    }
    batch.commit().then(() => alert('บันทึกแล้ว')).catch(error => console.error('Error : ', error));
  }

  async getIProducts() {
    const ref = this.db.collection('iproduct').ref;
    return await ref.get()
      .then(d => {
        return d.docs;
      })
      .catch(error => {
        return null;
      });
  }

  getiProducts() {
    return this.db.collection(`iproduct`).valueChanges({ idField: 'key' });
  }

  getgProducts() {
    return this.db.collection(`gproduct`).valueChanges({ idField: 'key' });
  }

  async saveCut(place: string, cutlist: any, user: any) {
    const monthyear = this.util.getMonthAndYear();
    const timeref = this.util.getTimeToday();
    const basicinfo = {
      user: user.uid,
      username: user.displayName,
      custlist: cutlist
    }

    const addtime = {
      [timeref]: basicinfo
    }

    const info = {
      [place]: addtime
    }

    const batch = this.db.firestore.batch();
    batch.set(this.db.doc(`cut/${monthyear}`).ref, info, { merge: true });
    batch.commit().then(() => alert('บันทึกแล้ว')).catch(error => console.error('Error : ', error));

    for (let product of cutlist) {
      const sfDocRef = this.db.doc(`cuttable/${monthyear}/table/${product.code}`).ref;
      return this.db.firestore.runTransaction(transaction => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then(sfDoc => {
          if (!sfDoc.exists) {
            transaction.set(sfDocRef, product);
          } else {
            let newAmount = sfDoc.data().amount + product.amount;
            transaction.update(sfDocRef, { amount: newAmount });
          }
        });
      }).then(() => {
        console.log("Transaction successfully committed!");
      }).catch(error => {
        console.log("Transaction failed: ", error);
      });
    }

  }

  async saveOrder(place: string, orderlist: any, user: any) {
    const weekyear = this.util.getWeekYear();
    const timeref = this.util.getTimeToday();
    const basicinfo = {
      user: user.uid,
      username: user.displayName,
      orderlist: orderlist
    }

    const addtime = {
      [timeref]: basicinfo
    }

    const info = {
      [place]: addtime
    }
    const batch = this.db.firestore.batch();

    batch.set(this.db.doc(`order/places`).ref, info, { merge: true });
    batch.set(this.db.doc(`order/${place}/${weekyear}/${timeref}`).ref, basicinfo, { merge: true });
    batch.commit().then(() => alert('บันทึกแล้ว')).catch(error => console.error('Error : ', error));

    for (let product of orderlist) {
      const sfDocRef = this.db.doc(`order/table/${weekyear}/${product.code}`).ref;
      this.db.firestore.runTransaction(transaction => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then(sfDoc => {
          if (!sfDoc.exists) {
            transaction.set(sfDocRef, product);
          } else {
            let newAmount = sfDoc.data().amount + product.amount;
            transaction.update(sfDocRef, { amount: newAmount });
          }
        });
      }).then(() => {
        console.log("Transaction successfully committed!");
      }).catch(error => {
        console.log("Transaction failed: ", error);
      });
    }
  }

  getOrders() {
    return this.db.doc(`order/places`).valueChanges();
  }

  deleteOrder(key: string, obj: Object) {
    const batch = this.db.firestore.batch();
    const deleteInfo = {
      [key]: firestore.FieldValue.delete()
    };
    batch.update(this.db.doc(`order/places`).ref, deleteInfo);
    batch.commit().then(() => alert('บันทึกแล้ว')).catch(error => console.error('Error : ', error));
  }

  getWeekOrder(name: string){
    const week = this.util.getWeekYear();
    return this.db.collection(`order/${name}/${week}`).valueChanges({ idField: 'key' });
  }

}

  // for (const o of order) {
    //   const updateRef = this.db.collection(name).doc(o.code);
    //   const info = {
    //     amount: firestore.FieldValue.increment(o.amount)
    //   };
    //   batch.update(updateRef.ref, info);
    //   products[o.code] = o;
    // }