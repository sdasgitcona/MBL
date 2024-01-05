import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { PrRoutingModule } from './pr-routing.module';






@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrRoutingModule,
    CardModule,
    PanelModule,
    MenuModule,
    FormsModule,
    ButtonModule
  ],
  exports:[],
})
export class PrModule { }
