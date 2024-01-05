import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorMasterRoutingModule } from './vendor-master-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
//import { CalendarModule } from 'primeng/calendar';
import { CalendarModule } from 'primeng/calendar';

import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendorMasterRoutingModule,
    CardModule,
    PanelModule,
    MenuModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    FieldsetModule,
    InputSwitchModule,
  ]
})
export class VendorMasterModule { }
