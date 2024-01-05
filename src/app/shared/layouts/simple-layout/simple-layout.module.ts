import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleLayoutRoutingModule } from './simple-layout-routing.module';
import { SimpleLayoutComponent } from './simple-layout.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderBreadcrumbComponent } from './header-breadcrumb/header-breadcrumb.component';
import { IssuePopupAddComponent } from 'src/app/features/issue/issue-popup-add/issue-popup-add.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import {SplitButtonModule} from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from "primeng/badge";
import {AvatarModule} from 'primeng/avatar';

import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    TopBarComponent,
    SideBarComponent,
    FooterComponent,
    HeaderBreadcrumbComponent,
    IssuePopupAddComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SimpleLayoutRoutingModule,
    OverlayPanelModule,
    SidebarModule,
    PanelModule,
    TableModule,
    SplitButtonModule,
    PanelMenuModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    MenuModule,
    DialogModule,
    StepsModule,
    DropdownModule,
    ChipsModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    InputSwitchModule,
    ProgressSpinnerModule,
  ],
  exports: [HeaderBreadcrumbComponent],
  providers: [IssuePopupAddComponent]
})
export class SimpleLayoutModule {}
