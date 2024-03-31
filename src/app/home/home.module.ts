import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import {HttpClientModule} from "@angular/common/http";
import { NgxMaskModule }  from  'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule
  ],
  exports: [
    NgxMaskModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
