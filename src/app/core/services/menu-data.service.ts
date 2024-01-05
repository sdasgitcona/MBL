import { Injectable, EventEmitter,Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {
  // public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Output() toggleMenuBar = new EventEmitter();

  getMenuList(): CustomMenuItem[] {
    return [
      {
        Label:'Dashboard',
        Icon: 'fa-dashboard',
        RouterLink: '/main/dashboard',
        Children: null,
        IsChildVisible: false,
      },
      {
        Label:'Company',
        Icon: 'fa-computer',
        RouterLink: 'null',
        Children: [
          {
            Label: 'Company Information',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              // {
              //   Label: 'List',
              //   Icon: 'fa-list',
              //   RouterLink: '/main/company/list',
              //   Children: null,
              //   IsChildVisible: false,
              // },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink:  '/main/company/action/add',
                //url: '/main/employee/list',
                // RouterLink: '<a href="www.google.com"></a>',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
        ],
        IsChildVisible: false,
      },
      {
        Label: 'Master',
        Icon: 'fa-building',
        RouterLink: null,
        Children: [
          
          {
            Label: 'Employee',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/employee/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink:  '/main/employee/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Supplier',
            RouterLink: '/main/supplier/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/supplier/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/supplier/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Project',
            RouterLink: '/main/project/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/project/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/project/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Location',
            RouterLink: '/main/locationmaster/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/locationmaster/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: 'main/locationmaster/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Item',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/item/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/item/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Bank',
            RouterLink: '/main/bankmaster/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/bankmaster/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/bankmaster/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Currency',
            RouterLink: '/main/currency/list',
            IsChildVisible: false,
            Children: null,
          },
        ],
        IsChildVisible: false,
      },
      {
        Label: 'Transaction',
        Icon: 'fa-dollar-sign',
        RouterLink: null,
        Children: [
          {
            Label: 'Invoice for Vendors',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: null,
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: null,
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Purchase Requisition',
            RouterLink: '/main/purchases-requisition/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/purchases-requisition/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/purchases-requisition/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Auto Create PO & RFQ',
            RouterLink: '/main/create-rfq-po/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/create-rfq-po/list',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Request For Quotation',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: 'main/request-quatation/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: 'main/request-quatation/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Quotation Analysis',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/quotation-analysis/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/quotation-analysis/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },         
          {
            Label: 'Purchase Order',
            RouterLink: '/main/purchase-order/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/purchase-order/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/purchase-order/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Goods Received Note',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/grn/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/grn/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'AP Invoice',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "/main/apinvoice/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "/main/apinvoice/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Debit Note',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "/main/debit-note",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "/main/debit-note/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Advance Payment',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "/main/advance-payment/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "/main/advance-payment/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Make Payment',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/make-payment/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/make-payment/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Return to Supplier',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/rtv/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/rtv/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
        ],
        IsChildVisible: false,
      },
      {
        Label: 'Setup',
        Icon: 'fa fa-cogs',
        RouterLink: null,
        Children: [
          {
            Label: 'Subsidiary',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "/main/subsidiary/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "/main/subsidiary/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Fiscal Calendar',
            RouterLink: '/main/fiscalcalendar/list',
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/fiscalcalendar/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/fiscalcalendar/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Tax Rate Rule',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/tax-rate/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/tax-rate/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Tax Group',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "/main/tax-group/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "/main/tax-group/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Account Code',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/accountcode/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/accountcode/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Role',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "main/role/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "main/role/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Approval Preference',
            RouterLink: "main/approval-preferences/list",
            IsChildVisible: false,
            Children:
            [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: "main/approval-preferences/list",
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: "main/approval-preferences/action/add",
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Document Sequencing',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/documentsequence/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/documentsequence/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'General Preference',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/general-preferences/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/general-preferences/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          {
            Label: 'Template Mapping',
            RouterLink: null,
            IsChildVisible: false,
            Children: [
              {
                Label: 'List',
                Icon: 'fa-list',
                RouterLink: '/main/template-mapping/list',
                Children: null,
                IsChildVisible: false,
              },
              {
                Label: 'New',
                Icon: 'fa-plus',
                RouterLink: '/main/template-mapping/action/add',
                Children: null,
                IsChildVisible: false,
              },
            ],
          },
          
        ],
        IsChildVisible: false,
      },
      {
        Label: 'Approval',
        Icon: 'fa-check-circle',
        RouterLink: null,
        Children: [
          {
            Label: 'Supplier Approval',
            RouterLink: '/main/supplier/supplier-approval',
            IsChildVisible: false,
            Children: null,
          },
          {
            Label: 'PR Approval',
            RouterLink: '/main/purchases-requisition/pr-approval',
            IsChildVisible: false,
            Children: null,
          },
          {
            Label: 'PO Approval',
            RouterLink: '/main/purchase-order/po-approval',
            IsChildVisible: false,
            Children: null,
          },
        ],
        IsChildVisible: false,
      },
      {
        Label:'Manage Integration',
        Icon: 'fa-hand-pointer',
        RouterLink: 'null',
        Children: [
          {
            Label: 'List',
            Icon: 'fa-list',
            RouterLink: '/main/manage-integration/list',
            Children: null,
            IsChildVisible: false,
          },
          {
            Label: 'New',
            Icon: 'fa-plus',
            RouterLink:  '/main/manage-integration/action/add',
            Children: null,
            IsChildVisible: false,
          },
        ],
        IsChildVisible: false,
      },
    ];
  }

  getModifiedList():MenuItem[]{
    return[
      {
        label:'Dashboard',
        icon: 'fa-dashboard',
        routerLink: '/main/dashboard',
        //items: [],
        url: '#/main/dashboard',
        target: "",
      },
      {
        label: 'Events',
        icon:'pi pi-fw pi-calendar',
        items: [
            {
                label: 'Edit',
                icon:'pi pi-fw pi-pencil',
                items: [
                    {
                    label: 'Save',
                    icon:'pi pi-fw pi-calendar-plus'
                    },
                    {
                    label: 'Delete',
                    icon:'pi pi-fw pi-calendar-minus'
                    }
                ]
            },
            {
                label: 'Archieve',
                icon:'pi pi-fw pi-calendar-times',
                items: [
                    {
                    label: 'Remove',
                    icon:'pi pi-fw pi-calendar-minus'
                    }
                ]
            }
        ]
        },
      {
        label: 'File',
        icon:'pi pi-fw pi-file',
        items: [
            {
                label: 'New',
                icon:'pi pi-fw pi-plus',
                items: [
                    {
                    label: 'Bookmark',
                    icon:'pi pi-fw pi-bookmark',
                    url: '#/main/bankmaster/list',
                    target: "",
                    },
                    {
                    label: 'Video',
                    icon:'pi pi-fw pi-video'
                    }
                ]
            },
            {
                label: 'Delete',
                icon:'pi pi-fw pi-trash'
            },
            {
                label: 'Export',
                icon:'pi pi-fw pi-external-link'
            }
        ]
        },
        {
        label: 'Edit',
        icon:'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Left',
                icon:'pi pi-fw pi-align-left'
            },
            {
                label: 'Right',
                icon:'pi pi-fw pi-align-right'
            },
            {
                label: 'Center',
                icon:'pi pi-fw pi-align-center'
            },
            {
                label: 'Justify',
                icon:'pi pi-fw pi-align-justify'
            }
        ]
        },
        {
          label: 'Users',
          icon:'pi pi-fw pi-user',
          items: [
              {
                  label: 'New',
                  icon:'pi pi-fw pi-user-plus',

              },
              {
                  label: 'Delete',
                  icon:'pi pi-fw pi-user-minus',
              },
              {
                  label: 'Search',
                  icon:'pi pi-fw pi-users',
                  items: [
                      {
                      label: 'Filter',
                      icon:'pi pi-fw pi-filter',
                      items: [
                          {
                              label: 'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                      },
                      {
                      icon:'pi pi-fw pi-bars',
                      label: 'List'
                      }
                  ]
              }
          ]
          },
    ];
  }
}
