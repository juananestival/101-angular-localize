import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { HeaderComponent } from './components/header/header.component';
import { SampleComponentComponent } from './components/sample-component/sample-component.component';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule} from '@angular/material/button'


@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    HeaderComponent,
    SampleComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
