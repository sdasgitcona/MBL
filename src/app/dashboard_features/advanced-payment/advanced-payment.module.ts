import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedPaymentRoutingModule } from './advanced-payment-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdvancedPaymentRoutingModule,
    CardModule,
    PanelModule,
    MenuModule,
    FormsModule,
    ButtonModule,
  ]
})
export class AdvancedPaymentModule { }
