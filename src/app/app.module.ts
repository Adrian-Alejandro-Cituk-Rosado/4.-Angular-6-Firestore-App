import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import {FormsModule} from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
export const firebaseConfig = {
  apiKey: "AIzaSyBgvx1ZpH_ENvQjiTve9VOroNlGGsPEA0g",
  authDomain: "angular-firebase-8311e.firebaseapp.com",
  projectId: "angular-firebase-8311e",
  storageBucket: "angular-firebase-8311e.firebasestorage.app",
  messagingSenderId: "583852986045",
  appId: "1:583852986045:web:c042ce8c00802eaf1eb1d4",
  measurementId: "G-HBG2TZX0WQ"
};

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
