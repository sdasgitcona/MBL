import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { SimpleLayoutComponent } from './simple-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('src/app/features/control-panel/control-panel.module').then(
      //       (m) => m.ControlPanelModule
      //     ),
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'dash',
        loadChildren: () =>
          import('src/app/features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'supplier',
        loadChildren: () =>
          import('src/app/features/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'subsidiary',
        loadChildren: () =>
          import('src/app/features/subsidiary/subsidiary.module').then(
            (m) => m.SubsidiaryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'project',
        loadChildren: () =>
          import('src/app/features/project/project.module').then(
            (m) => m.ProjectModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tax-rate',
        loadChildren: () =>
          import('src/app/features/tax-rate-rule/tax-rate-rule.module').then(
            (m) => m.TaxRateRuleModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'locationmaster',
        loadChildren: () =>
          import('src/app/features/locationmaster/locationmaster.module').then(
            (m) => m.LocationmasterModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'bankmaster',
        loadChildren: () =>
          import('src/app/features/bankmaster/bankmaster.module').then(
            (m) => m.BankmasterModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'item',
        loadChildren: () =>
          import('src/app/features/item/item.module').then(
            (m) => m.ItemModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'currency',
        loadChildren: () =>
          import('src/app/features/currency1/currency1.module').then(
            (m) => m.Currency1Module
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'role',
        loadChildren: () =>
          import('src/app/features/role/role.module').then(
            (m) => m.RoleModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'accountcode',
        loadChildren: () =>
          import('src/app/features/accountcode/accountcode.module').then(
            (m) => m.AccountcodeModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'documentsequence',
        loadChildren: () =>
          import('src/app/features/document-sequence/document-sequence.module').then(
            (m) => m.DocumentSequenceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tax-group',
        loadChildren: () =>
          import('src/app/features/tax-group/tax-group.module').then(
            (m) => m.TaxGroupModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('src/app/features/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'purchases-requisition',
        loadChildren: () =>
          import('src/app/features/purchases-requisition/purchases-requisition.module').then(
            (m) => m.PurchasesRequisitionModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'fiscalcalendar',
        loadChildren: () =>
          import('src/app/features/fiscal-calender/fiscal-calender.module').then(
            (m) => m.FiscalCalenderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'general-preferences',
        loadChildren: () =>
          import('src/app/features/general-preferences/general-preferences.module').then(
            (m) => m.GeneralPreferencesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'approval-preferences',
        loadChildren: () =>
          import('src/app/features/approval-prefference/approval-prefference.module').then(
            (m) => m.ApprovalPrefferenceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'purchase-order',
        loadChildren: () =>
          import('src/app/features/purchase-order/purchase-order.module').then(
            (m) => m.PurchaseOrderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'template-mapping',
        loadChildren: () =>
          import('src/app/features/templatemapping/templatemapping.module').then(
            (m) => m.TemplatemappingModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'apinvoice',
        loadChildren: () =>
          import('src/app/features/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'request-quatation',
        loadChildren: () =>
          import('src/app/features/requist-quatation/requist-quatation.module').then(
            (m) => m.RequistQuatationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'quotation-analysis',
        loadChildren: () =>
          import('src/app/features/quotation-analysis/quotation-analysis.module').then(
            (m) => m.QuotationAnalysisModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'make-payment',
        loadChildren: () =>
          import('src/app/features/make-payment/make-payment.module').then(
            (m) => m.MakePaymentModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'grn',
        loadChildren: () =>
          import('src/app/features/grn/grn.module').then(
            (m) => m.GRNModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'department',
        loadChildren: () =>
          import('src/app/features/department/department.module').then(
            (m) => m.DepartmentModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'company',
        loadChildren: () =>
          import('src/app/features/company-info/company-info.module').then(
            (m) => m.CompanyInfoModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'advance-payment',
        loadChildren: () =>
          import('src/app/features/advance-payment/advance-payment.module').then(
            (m) => m.AdvancePaymentModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'create-rfq-po',
        loadChildren: () =>
          import('src/app/features/create-rfq-po/create-rfq-po.module').then(
            (m) => m.CreateRfqPoModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'manage-integration',
        loadChildren: () =>
          import('src/app/features/manage-integration/manage-integration.module').then(
            (m) => m.ManageIntegrationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'debit-note',
        loadChildren: () =>
          import('src/app/features/debit-note/debit-note.module').then(
            (m) => m.DebitNoteModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'rtv',
        loadChildren: () =>
          import('src/app/features/rtv/rtv.module').then(
            (m) => m.RtvModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'NetSuit',
        loadChildren: () =>
          import('src/app/features/netsuite/netsuite.module').then(
            (m) => m.NetsuiteModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-creation',
        loadChildren: () =>
          import('src/app/features/user-creation/user-creation.module').then(
            (m) => m.UserCreationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'payment-term',
        loadChildren: () =>
          import('src/app/features/payment-term/payment-term.module').then(
            (m) => m.PaymentTermModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'issue',
        loadChildren: () =>
          import('src/app/features/issue/issue.module').then(
            (m) => m.IssueModule
          ),
        canActivate: [AuthGuard],
      },
      //FOR Report
      {
        path: 'reports',
        loadChildren: () =>
          import('src/app/features/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'report_dashboard',
        loadChildren: () =>
          import('src/app/features/report-dashboard/report-dashboard.module').then(
            (m) => m.ReportDashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'invoice-emails',
        loadChildren: () =>
          import('src/app/features/invoice-emails/invoice-emails.module').then(
            (m) => m.InvoiceEmailsModule
          ),
        canActivate: [AuthGuard],
      },
      //END FOR Report

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleLayoutRoutingModule { }
