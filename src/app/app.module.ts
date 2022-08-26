import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GetOfficeComponent } from './get-office/get-office.component';
import { GetOfficeService } from './services/get-office.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayOfficeComponent } from './display-office/display-office.component';
import { UpdateOfficeComponent } from './update-office/update-office.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GetOfficeComponent,
    DisplayOfficeComponent,
    UpdateOfficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GetOfficeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
