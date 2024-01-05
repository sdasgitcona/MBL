import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { PoRoutingModule } from './po-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PoRoutingModule,
    CardModule,
    PanelModule,
    MenuModule,
    FormsModule,
    ButtonModule
  ]
})
export class PoModule { }
