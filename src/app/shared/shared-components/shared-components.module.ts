import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { AddressComponent } from './address/address.component';
import { HistoryComponent } from './history/history.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule, } from 'primeng/fieldset';

import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [AddressComponent, HistoryComponent],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,

    InputTextModule
  ],
  exports: [AddressComponent, HistoryComponent],
})
export class SharedComponentsModule {}
