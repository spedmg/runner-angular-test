import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbdTypeaheadTemplate } from './typeahead-template';
import { NgxTypeaheadModule } from 'ngx-typeahead';



import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, NgbdTypeaheadTemplate
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,TypeaheadModule, NgxTypeaheadModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
