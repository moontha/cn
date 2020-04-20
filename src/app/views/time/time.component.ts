import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  @ViewChild('flag') flag: ElementRef;

  subscription: Subscription;
  user;
  workuser;
  place = '';
  latitude: number;
  longitude: number;
  shop;
  distance: number;

  constructor(
    private dbService: DbService,
    private auth: AuthService
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(guser => {
      this.user = guser;
      this.workuser = this.dbService.getUserFromWork(this.user.uid);
    });
    this.setLocation();
  }

  getWorkUser() {
    this.workuser = this.dbService.getUserFromWork(this.user.uid);
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  async startWork() {
    let isDuplicated = typeof this.flag === 'undefined' ? false : true;
    //const duplicated = this.flag.nativeElement.innerHTML;
    if (isDuplicated) {
      alert('ลงซ้ำ! ออกจากงานก่อน !');
      return;
    }
    if (!!!this.place.trim()) {
      return;
    }
    if (this.place.length === 2) {
      let name = this.place.split('');
      let text = '';
      text = name[0] + '0' + name[1];
      this.place = text;
    }
    this.place = this.place.toUpperCase();

    this.shop = await this.dbService.getShop(this.place);
    if (!!!this.shop) {
      alert('หาไม่เจอ! ');
      return;
    }
    this.distance = this.getDistanceFromLatLonInKm(
      this.latitude,
      this.longitude,
      this.shop.lat,
      this.shop.lon
    );
    this.dbService.startWork(this.place, this.user);
    this.getWorkUser();
  }

  finishWork(place, uid) {
    this.dbService.endWork(place, uid);
    this.getWorkUser();
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c) * 1000// Distance in meter.
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

}
