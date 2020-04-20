import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ViewsModule } from './views/views.module';
import { Utility } from './models/util.model';
import { HomeComponent } from './views/home/home.component';

const config = {
  apiKey: "AIzaSyD4_y3wy_uYaO1Gu8ZCbI34DqAdCDgSw4I",
  authDomain: "cninterplus.firebaseapp.com",
  databaseURL: "https://cninterplus.firebaseio.com",
  projectId: "cninterplus",
  storageBucket: "cninterplus.appspot.com",
  messagingSenderId: "376833680063",
  appId: "1:376833680063:web:bf737e47f0537bbc761c0a",
  measurementId: "G-1Z5K0L99NR"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ViewsModule,
    CommonModule
  ],
  providers: [Utility],  
  bootstrap: [AppComponent]
})
export class AppModule { }
