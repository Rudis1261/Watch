import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FIREBASE_PROVIDERS, AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Layout Components
import { NavHeaderComponent } from './nav-header.component';
import { LoadingBar } from './loading.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LazyComponent } from './lazy.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

import { TitleCasePipe } from './title-case.pipe';
import { FilterPipe } from './filter.pipe';
import { LengthPipe } from './length.pipe';
import { BbcodePipe } from './bbcode.pipe';
import { SafePipe } from './safe.pipe';
import { BbcodeStripPipe } from './bbcode-strip.pipe';
import { SearchPipe } from './search.pipe';
import { SlugifyPipe } from './slugify.pipe';
import { OrderByPipe } from './order-by.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { KeysPipe } from './keys-pipe.component';

import { AuthGuard } from './auth.service';
import { BbcodesService } from './bbcodes.service';
import { LoadscriptService } from './loadscript.service';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCE1W85LvhKreATl_fVHxGY0EZ97wgvVgw",
  authDomain: "watch-3adb6.firebaseapp.com",
  databaseURL: "https://watch-3adb6.firebaseio.com",
  projectId: "watch-3adb6",
  storageBucket: "watch-3adb6.appspot.com",
  messagingSenderId: "1064500732620"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeaderComponent,
    LoginComponent,
    ModalComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    LoadingBar,
    LazyComponent,
    FilterPipe,
    TitleCasePipe,
    LengthPipe,
    LimitToPipe,
    BbcodePipe,
    SafePipe,
    BbcodeStripPipe,
    SearchPipe,
    SlugifyPipe,
    OrderByPipe,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    FIREBASE_PROVIDERS,
    AuthGuard,
    ModalComponent,
    BbcodesService,
    LoadscriptService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
