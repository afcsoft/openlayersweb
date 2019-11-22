import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MapComponent } from './map/map.component';

import { AppStateService } from './state/appstate.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,HttpClientModule],
  providers:    [ AppStateService,HttpClientModule ],
  declarations: [ AppComponent, MapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

