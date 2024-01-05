import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    CardModule,
    PanelModule,
    MenuModule,
    FormsModule,
    ButtonModule,
  ]
})
export class InvoiceModule { }
