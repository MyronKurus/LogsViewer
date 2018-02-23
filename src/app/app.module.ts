import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateInputComponent } from './components/date-input/date-input.component';
import { LogFormComponent } from './components/log-form/log-form.component';
import { LogItemComponent } from './components/log-item/log-item.component';
import { EnumKeysPipe } from './pipes/keys.pipe';
import { LogsService } from './services/logs.service';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';


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
    MyDateRangePickerModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpModule,
    ClipboardModule,
    NgbModule.forRoot()
  ],
  providers: [ LogsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
