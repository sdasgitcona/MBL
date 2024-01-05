import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestOneComponent } from './test-one/test-one.component';
import { TesttwoComponent } from './testtwo/testtwo.component';
import { TestthreeComponent } from './testthree/testthree.component';


@NgModule({
  declarations: [
    TestOneComponent,
    TesttwoComponent,
    TestthreeComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  exports: [
    TestOneComponent,
    TesttwoComponent,
    TestthreeComponent
  ]
})
export class TestModule { }
