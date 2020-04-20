import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Utility } from '../models/util.model';
import { AuthService } from './auth.service';

export interface Shop {
  name: string;
  type: string;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private util: Utility
  ) { }

  async getShop(name: string) {
    const ref = this.db.collection<Shop>('shops').doc(name).ref;
    return await ref.get()
      .then(d => {
        return d.data();
      })
      .catch(error => {
        return null;
      });
  }

  getUserFromWork(uid: string) {
    const day = this.util.getDay(new Date());
    const ref = this.db.collection(`atuser/${uid}/${day}`);
    return ref.valueChanges({ idField: 'key' });
  }

  startWork(place: string, user) {
    const day = this.util.getDay(new Date());
    const hasRole = (typeof user.role === 'undefined') ? "unknown" : user.role;
    const userinfo = {
      starttime: firestore.FieldValue.serverTimestamp(),
      workplace: place,
      username: user.displayName,
      userid: user.uid,
      endtime: firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL,
      role: hasRole,
      start: true
    }

    const atuid = {
      [user.uid] : userinfo
    }
    const atplace = {
      [place] : atuid
    }
    const atwork = `atwork/${day}`;
    const batch = this.db.firestore.batch();
    batch.set(this.db.doc(atwork).ref, atplace, { merge: true });

    const atuser = `atuser/${user.uid}/${day}/${place}`;
    batch.set(this.db.doc(atuser).ref, userinfo, { merge: true });

    batch.commit()
      .then(() => {
        console.log('start saved.')
      })
      .catch(error => {
        console.error('Error : ', error);
      });
  }

  endWork(place: string, uid: string) {
    const day = this.util.getDay(new Date());
    const timestamp = firestore.FieldValue.serverTimestamp();
    //ref.update({ updatedAt: timestamp })
    const atEnd = `${place}.${uid}.endtime`;
    const atStart = `${place}.${uid}.start`;

    const updateUser = {
      [atEnd]: timestamp,
      [atStart]: false
    }
    const batch = this.db.firestore.batch();
    const atwork = `atwork/${day}`;
    batch.update(this.db.doc(atwork).ref, updateUser);

    const atuser = `atuser/${uid}/${day}`;
    const updateWork = {
      endtime: timestamp,
      start: false
    }

    batch.update(this.db.collection(atuser).doc(place).ref, updateWork);

    batch.commit()
      .then(() => {
        console.log('end saved.')
      })
      .catch(error => {
        //console.error('Error : ', error);
      });
  }

  workMonitor(workday) {
    const day = this.util.getDay(workday);
    return this.db.collection('work').doc(day).valueChanges();
  }

  monitor(workday: Date){
    const day = this.util.getDay(workday);
    return this.db.doc(`atwork/${day}`).valueChanges();
  }

  async getPosts() {
    const ref = this.db.collection('web').ref;
    return await ref.get()
      .then(d => {
        return d.docs;
      })
      .catch(error => {
        alert('No Data!');
      });
  }

}
