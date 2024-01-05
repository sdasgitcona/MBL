import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.gaurd';
import { ErrorComponent } from './shared/error/error.component';

const appRoutes: Routes = [
  {
      path: 'login',
      loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('src/app/features/forgot/forgot.module').then(m => m.ForgotModule)
  },
  {
      path: 'main',
      loadChildren: () => import('src/app/shared/layouts/simple-layout/simple-layout.module').then(m => m.SimpleLayoutModule)
  },
  {
    path: 'approval',
    loadChildren: () => import('src/app/features/mail-approval/mail-approval.module').then(m => m.MailApprovalModule)
  },
  // {
  //   path: 'supplierApproval',
  //   loadChildren: () => import('src/app/features/supplier/supplier.module').then(m => m.SupplierModule)
  // },
  {
      path: 'error',
      component: ErrorComponent,
  },
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
