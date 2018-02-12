import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DateInputComponent } from './components/date-input/date-input.component';
import { LogFormComponent } from './components/log-form/log-form.component';
import { LogItemComponent } from './components/log-item/log-item.component';
import { EnumKeysPipe } from './pipes/keys.pipe';
import { LogsService } from './services/logs.service';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    DateInputComponent,
    EnumKeysPipe,
    LogFormComponent,
    LogItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [ LogsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
