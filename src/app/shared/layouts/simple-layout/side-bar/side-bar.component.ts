import { Component, OnInit } from '@angular/core';
import { CustomMenuItem } from 'src/app/core/models/menu-item.model';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { MenuItem } from 'primeng/api'; //MODIFY New menu 

import { PanelMenuStateService } from 'src/app/core/services/panel-menu-state.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  //items: CustomMenuItem[] = [];

  items: MenuItem[]; //MODIFY New menu 
  selectedMainMenu: any = []; //MODIFY New menu 
  selectedSubMenu: MenuItem; //MODIFY New menu 
  selectedItem?: string | null = ""; //MODIFY New menu 

  visible: boolean = false;
  user_Dtls: any;
  role_Dtls: any;
  specificMenus:any=[];
  checkedMenu:any;
  isSidebarOpen: boolean = true;
  issuePopup: boolean = false;
  position: string = 'center';
  constructor(private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private menuDataService: MenuDataService,
    private panelMenuStateService: PanelMenuStateService,
    private applicationStateService: ApplicationStateService) { }

  ngOnInit() {

    //Menu toggle 
    const panelMenuState = this.panelMenuStateService.getCachedPanelMenuState();
      if (panelMenuState) {
        this.items = panelMenuState;
      }

    // Set the initial state of the sidebar based on the screen width
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      // this.isSidebarOpen = false;
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = true;
    }

    // Listen for window resize events and update the state of the sidebar
    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // this.isSidebarOpen = false;
        this.isSidebarOpen = true;
      } else {
        this.isSidebarOpen = true;
      }
    });
// End Menu toggle 

    const retDetails: any = localStorage.getItem("LoggerDTLS");// sessionStorage.getItem("LoggerDTLS");
    this.user_Dtls = JSON.parse(retDetails);

    const retRoleDetails: any = localStorage.getItem("RoleDTLS"); //sessionStorage.getItem("RoleDTLS");
    this.role_Dtls = JSON.parse(retRoleDetails);

    const selectedMenu = localStorage.getItem("activeMenu");
    this.checkedMenu=selectedMenu;
   // this.items = this.getModifiedList();//.getMenuList();

   const allMenus=this.getModifiedList();
   this.specificMenus=[];
   allMenus.forEach((Item: any, index: number) => {
   this.role_Dtls[0].rolePermissions.some((data: any, index: number) =>
   {
     if(data.moduleName == Item.label)
   { 
     Item.items.map((FiletrItem: any, index: number) => {
       if(data.accessPoint == FiletrItem.label){

        if ((data.create  || data.edit || data.view )) {
          FiletrItem.visible=true;
        }

        // if (data.create == false && data.edit == false && data.view == false ) {
        //   Item.items.splice(index, 1);
        // }

      //   if(FiletrItem.label == 'Invoice Emails' && this.user_Dtls.userType !='ROOTADMIN' )
      //   {
      //     Item.items.splice(index, 1);
      //   }
      //  else
       
        // if ((data.create == false && data.edit == false && data.view == false ) && this.role_Dtls[0].selectedAccess == 'APPROVER') {
        //   Item.items.splice(index, 1);
        // }
        // else  if (data.create == false && data.view == false && this.role_Dtls[0].selectedAccess == 'VENDOR' && data.accessPoint == FiletrItem.label) {
        //   Item.items.splice(index, 1);
        // }
        //  else  if ((data.create == false && data.edit == false && data.view == false )&& (this.role_Dtls[0].selectedAccess == 'ADMIN_APPROVER')) {
        //      Item.items.splice(index, 1);
        //    }
        //    else  if ((data.create == false && data.edit == false && data.view == false )&& (this.role_Dtls[0].selectedAccess == 'ADMIN')) {
        //     Item.items.splice(index, 1);
        //   }
         //--Show List And New
          //  if (data.create == false || data.edit == false && data.view == false) {
          //    Item.items.splice(index, 1);
          //     //this.specificMenus.push(FiletrItem);
          //    //return false;
          //  }
          //  else  if (data.create == false &&  this.role_Dtls[0].selectedAccess == 'APPROVER') {
          //   Item.items.splice(index, 1);
          //    //this.specificMenus.push(FiletrItem);
          //   //return false;
          // }
          }
     });

     
   }
   }
   );
 });
   this.items =allMenus;
    var that = this;
    this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
      if (data && data != null) {
        that.visible = !that.visible;
      }
    });

    if (this.applicationStateService.getIsMobileResolution()) {
      this.visible = false;
    } else {
      this.visible = true;
    }

    var activeMenu = this.sessionService.getItem("active-menu");
    if (activeMenu) {
      this.selectedItem = activeMenu;
    } else {
      this.selectedItem = "Home";
    }
  }

  ngOnDestroy() {
    this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
  }

  toggleSidebar() {
    // alert("SIDEBAR")
    // Cache the state of the panel menu when the sidebar is closed
    if (!this.isSidebarOpen) {
      this.panelMenuStateService.cachePanelMenuState(this.items);
      this.menuDataService.toggleMenuBar.next(true);
      this.visible = true
    } else {
      this.panelMenuStateService.cachePanelMenuState(this.items);
      this.menuDataService.toggleMenuBar.next(true);
      this.visible = false

    }

    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onPanelMenuItemClick(item: MenuItem,Page:any='') {
    if(Page != ""){localStorage.setItem("activeMenu", Page);}
    let MenuList = this.getModifiedList();
    let parentChanged = false;
    let selectedParent: any = [];
    let RoleWiseMenus: any = []
    selectedParent = MenuList.find(x => x.label === item.label);
    if (selectedParent) {
      //this.role_Dtls[0].rolePermissions= this.role_Dtls[0].rolePermissions.filter((k:any)=>k.moduleName == selectedParent.label);
      RoleWiseMenus = [];
     // for (let i = 0; i < this.role_Dtls[0].rolePermissions.length; i++) {
    //     selectedParent.items.forEach((Item: any, index: number) => {
    //       //const isUserExists = 
    //       this.role_Dtls[0].rolePermissions.some((data: any, index: number) =>
    //        {
    //         //--If Access Pint Matched with Role Permission
    //         if(data.accessPoint == Item.label){
    //         //--Show List And New
    //           if (data.create == true || data.edit == true && data.view == true) {
    //             RoleWiseMenus.push(Item);
    //             return false;
    //           }
    //           //--Show List Only
    //           else if (data.create == true && data.view == false) {
    //             RoleWiseMenus.push(Item);
    //             return false;
    //             // RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //             //   if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //             //     FilterItem.items.splice(0, 1);
    //             //   }
    //             // });
    //           }
    //           //--Show New Only
    //           else if (data.create == false && data.view == true) {
    //             RoleWiseMenus.push(Item);
    //             return false;
    //             // RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //             //   if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //             //     FilterItem.items.splice(1, 1);
    //             //   }
    //             // });
    //           }
    //        }
    //        }
    //           //--Show List And New
    //           // if (this.role_Dtls[0].rolePermissions[i].create == true || this.role_Dtls[0].rolePermissions[i].edit == true && this.role_Dtls[0].rolePermissions[i].view == true) {
    //           //   RoleWiseMenus.push(Item);
    //           // }
    //           //--Show List Only
    //           // if (this.role_Dtls[0].rolePermissions[i].create == true && this.role_Dtls[0].rolePermissions[i].view == false) {
    //           //   RoleWiseMenus.push(Item);
    //           //   RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //           //     if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //           //       FilterItem.items.splice(0, 1);
    //           //     }
    //           //   });
    //           // }
    //           //--Show New Only
    //           // else if (this.role_Dtls[0].rolePermissions[i].create == false && this.role_Dtls[0].rolePermissions[i].view == true) {
    //           //   RoleWiseMenus.push(Item);
    //           //   RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //           //     if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //           //       FilterItem.items.splice(1, 1);
    //           //     }
    //           //   });
    //           // }
    //        );
    //       if (false) {
    //        // if (Item.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //           //--Show List And New
    //           // if (this.role_Dtls[0].rolePermissions[i].create == true || this.role_Dtls[0].rolePermissions[i].edit == true && this.role_Dtls[0].rolePermissions[i].view == true) {
    //           //   RoleWiseMenus.push(Item);
    //           // }
    //           //--Show List Only
    //           // if (this.role_Dtls[0].rolePermissions[i].create == true && this.role_Dtls[0].rolePermissions[i].view == false) {
    //           //   RoleWiseMenus.push(Item);
    //           //   RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //           //     if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //           //       FilterItem.items.splice(0, 1);
    //           //     }
    //           //   });
    //           // }
    //           //--Show New Only
    //           // else if (this.role_Dtls[0].rolePermissions[i].create == false && this.role_Dtls[0].rolePermissions[i].view == true) {
    //           //   RoleWiseMenus.push(Item);
    //           //   RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //           //     if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //           //       FilterItem.items.splice(1, 1);
    //           //     }
    //           //   });
    //           // }
    //           //this.selectedMainMenu.items.splice(index,1);
    //         }
    //         //this.role_Dtls[0].rolePermissions[index].accessPoint
    //       //}


    //       // if (Item.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //       //   //--Show List And New
    //       //   if (this.role_Dtls[0].rolePermissions[i].create == true || this.role_Dtls[0].rolePermissions[i].edit == true && this.role_Dtls[0].rolePermissions[i].view == true) {
    //       //     RoleWiseMenus.push(Item);
    //       //   }
    //       //   //--Show List Only
    //       //   if (this.role_Dtls[0].rolePermissions[i].create == true && this.role_Dtls[0].rolePermissions[i].view == false) {
    //       //     RoleWiseMenus.push(Item);
    //       //     RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //       //       if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //       //         FilterItem.items.splice(0, 1);
    //       //       }
    //       //     });
    //       //   }//--Show New Only
    //       //   else if (this.role_Dtls[0].rolePermissions[i].create == false && this.role_Dtls[0].rolePermissions[i].view == true) {
    //       //     RoleWiseMenus.push(Item);
    //       //     RoleWiseMenus.forEach((FilterItem: any, index: number) => {
    //       //       if (FilterItem.label == this.role_Dtls[0].rolePermissions[i].accessPoint) {
    //       //         FilterItem.items.splice(1, 1);
    //       //       }
    //       //     });
    //       //   }
    //       //   //this.selectedMainMenu.items.splice(index,1);
    //       // }
    //     });
    //  // }
    //   for (let x = 0; x < this.items.length; x++) {
    //     if (this.items[x].label == item.label) {
    //       this.items[x].items = RoleWiseMenus
    //     }
    //   }

      //BELOW LOGIC IS TO COLLAPSE ALL SUB MENU ITEMS IN THE PREVIOUSLY SELECTED MAIN MENU IF ANY
      if (this.selectedMainMenu?.items && this.selectedMainMenu?.items.length > 0) {
        this.selectedMainMenu.items.forEach((subItem: any) => {
          subItem.expanded = false;
        });
      }
      this.selectedMainMenu = selectedParent;
      parentChanged = true;


      // item=RoleWiseMenus;
      // selectedParent=RoleWiseMenus;

    }




    //IF THE PARENT IS SET - RETURN
    if (parentChanged)
      return;

    //THIS RETURN IS TO COLLAPSE THE SUBMENU ITEM ON CLICKING IT AGAIN
    if (item.label === this.selectedSubMenu?.label)
      return;

    //find the subitem
    let selectedSubItem = this.selectedMainMenu?.items?.find((x: any) => x.label === item.label);
    if (selectedSubItem) {
      this.selectedSubMenu = selectedSubItem;
      this.selectedMainMenu.items?.forEach((subItem: any) => {
        if (subItem.label !== item.label) {
          subItem.expanded = false;
        } else {
          subItem.expanded = true;
        }
      });
    }


  }

  // on menu click event
  onMenuClick(menu: MenuItem) {
    //----Role wise Menu
    if (menu != null) {
      var Totalcount: any = menu;
      var OnlyHeader = Totalcount.find((obj: any) => obj.Icon == undefined);
      if (OnlyHeader != undefined) {
        for (let i = 0; i < Totalcount.length; i++) {
          for (let k = 0; k < this.role_Dtls[0].rolePermissions.length; k++) {
            if (Totalcount[i].Label == this.role_Dtls[0].rolePermissions[k].accessPoint) {
              if (Totalcount[i].Children != null) {
                for (let j = 0; j < Totalcount[i].Children.length; j++) {
                  if (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == false) {
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "List" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "New" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });

                  }
                  else if (this.role_Dtls[0].rolePermissions[k].create == true && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == false) {
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "List" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });
                  }
                  else if (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == true) {
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "New" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });
                  }

                  else if (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == true) {
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "New" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });
                  }

                  else if ((this.role_Dtls[0].rolePermissions[k].create == true && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == false) || (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == false)) {
                    Totalcount[i].Children.forEach((value: any, index: any) => {
                      value.Label == "List" ? Totalcount[i].Children.splice(index, 1) : Totalcount[i].Children;
                    });
                  }
                  else { }
                }
              }
              else {
                if (Totalcount[i].Label == this.role_Dtls[0].rolePermissions[k].accessPoint && this.role_Dtls[0].rolePermissions[k].view == false && menu.label == "Approval") {
                  Totalcount.forEach((value: any, index: any) => {
                    Totalcount.splice(i, 1);
                  });
                }
              }

            }
            else {
              // menu.Children = menu.Children?.filter(
              // (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label));

            }
          }
        }
      }
    }
    //-End


    //  if (menu.Children != undefined || menu.Children != null) {
    //     this.toggleSubMenu(menu);
    //     return;
    //   }

    //   if (menu.RouterLink == undefined || menu.RouterLink == null || menu.RouterLink == "") {
    //       this.routeStateService.add("Error 404", "/error", null, false);
    //       return;
    //   }
    //   this.selectedItem = menu.Label;
    //   this.sessionService.setItem("active-menu", menu.Label);
    //   this.routeStateService.add(menu.Label ? menu.Label : "", menu.RouterLink, null, true);
    // hide menu bar after menu click for mobile layout
    setTimeout(() => {
      if (this.applicationStateService.getIsMobileResolution()) {
        this.visible = false;
      }
    }, 100);
  }

  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
    menu.IsChildVisible = !menu.IsChildVisible;

  }


  // menu Data Service
  getModifiedList(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        icon: 'fa-solid fa-table-cells-large fa-lg',
        //routerLink: '/main/dashboard',<i class="fa-solid fa-table-cells-large"></i>
        //routerLink: this.role_Dtls[0].subsidiaryId == null ? '/main/dashboard/cfo_dashboard' : '/main/dashboard',
        routerLink: this.user_Dtls.userType=='ROOTADMIN' ?  '/main/dashboard/product_dashboard': this.user_Dtls.userType=='SUPERADMIN' ? '/main/dashboard/cfo_dashboard' : '/main/dashboard',
        //routerLink: this.role_Dtls.length > 0 ? (this.role_Dtls[0].userType === 'ROOTADMIN' ? '/main/dashboard/product_dashboard' : (this.role_Dtls[0].userType === 'SUPERADMIN' ? '/main/dashboard/cfo_dashboard' : '/main/dashboard')) : '/main/dashboard',
        command: e => this.onPanelMenuItemClick(e.item),
        
      },

      // {
      //   label: 'Company Information',
      //   icon: 'fa fa-computer',
      //   command: e => this.onPanelMenuItemClick(e.item),
      //   routerLink: null,
      //   items:[
      //     // {
      //     //   label: 'List',
      //     //   icon: 'fa fa-list',
      //     //   routerLink: null,
      //     // },
      //     // {
      //     //   label: 'New',
      //     //   icon: 'fa fa-plus',
      //     //   routerLink: '/main/company/action/add',
      //     // },

      //     {
      //       label: 'Company Information',
      //       routerLink: null,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       items: [
      //           {
      //               label: 'List',
      //               icon: 'fa fa-list',
      //               routerLink: '/main/company/list',
      //           },
      //           {
      //               label: 'New',
      //               icon: 'fa fa-plus',
      //               routerLink: '/main/company/action/add',
      //           },
      //       ],
      //     },

      //   ],
      // },

      // {
      //   label: 'Master',
      //   icon: 'fa fa-building',
      //   command: e => this.onPanelMenuItemClick(e.item),
      //   routerLink: null,
      //   items: [
          
      //     {
      //       label: 'Employee',
      //       routerLink: '/main/employee/list',
      //       //icon:'fa fa-user-tie',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/employee/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/employee/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Supplier',
      //       routerLink: '/main/supplier/list',
      //       //icon:'fa fa-truck headingIcon',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/supplier/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/supplier/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Item',
      //       routerLink: '/main/item/list',
      //       //icon: 'fa fa-list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/item/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/item/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Bank',
      //       routerLink: '/main/bankmaster/list',
      //       //icon: 'fa fa-bank',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/bankmaster/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/bankmaster/action/add',
      //       //   },
      //       // ],
      //     },

      //     {
      //       label: 'Location',
      //       routerLink:  '/main/locationmaster/list',
      //       //icon:'fa fa-map-marker',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/locationmaster/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/locationmaster/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Project',
      //       routerLink: '/main/project/list',
      //       //icon:'fa fa-hands-holding-child',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/project/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/project/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Department',
      //       routerLink: '/main/department/list',
      //       //icon:'fa fa-hands-holding-child',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/project/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/project/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Currency',
      //       routerLink: '/main/currency/list',
      //       //icon:'fa fa-dollar',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //     },
      //     {
      //       label: 'Role',
      //       routerLink: '/main/role/list',
      //       //icon:'fa fa-person-circle-question',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/role/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/role/action/add',
      //       //   },
      //       // ],
      //     },

      //   ],
      // },<i class="fa-solid fa-file-invoice"></i>
      {
        label: 'Transaction',
        icon: 'fa-solid fa-file-invoice fa-lg',
        command: e => this.onPanelMenuItemClick(e.item),
        routerLink: null,
        items: [
          {
            label: 'Purchase Requisition',
            routerLink: '/main/purchases-requisition/list',
            command: e => this.onPanelMenuItemClick(e.item,'PR'),
            visible:false,
            //styleClass:this.checkedMenu == "PR" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/purchases-requisition/list',
            //     //url: '#/main/purchases-requisition/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/purchases-requisition/action/add',
            //     //url: '#/main/purchases-requisition/action/add',
            //   },
            // ],
          },
          {
            label: 'Auto Create RFQ & PO',
            routerLink: '/main/create-rfq-po/list',
            command: e => this.onPanelMenuItemClick(e.item,'AutoRFQ'),
            visible:false,
            styleClass:this.checkedMenu == "AutoRFQ" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/create-rfq-po/list',
            //     //url: '#/main/purchases-requisition/list',
            //   },
            //   // {
            //   //     label: 'New',
            //   //     icon: 'fa fa-plus',
            //   //     routerLink: '/main/purchases-requisition/action/add',
            //   //     url: '#/main/purchases-requisition/action/add',
            //   // },
            // ],
          },
          {
            label: 'Request For Quotation',
            routerLink: '/main/request-quatation/list',
            command: e => this.onPanelMenuItemClick(e.item,'RFQ'),
            visible:false,
            styleClass:this.checkedMenu == "RFQ" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/request-quatation/list',
            //     //url: '#/main/purchases-requisition/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/request-quatation/action/add',
            //     //url: '#/main/purchases-requisition/action/add',
            //   },
            // ],
          },
          {
            label: 'Quotation Analysis',
            routerLink: '/main/quotation-analysis/list',
            command: e => this.onPanelMenuItemClick(e.item,'QA'),
            visible:false,
            styleClass:this.checkedMenu == "QA" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/quotation-analysis/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/quotation-analysis/action/add',
            //   },
            // ],
          },
          {
            label: 'Purchase Order',
            routerLink: '/main/purchase-order/list',
            command: e => this.onPanelMenuItemClick(e.item,'PO'),
            visible:false,
            styleClass:this.checkedMenu == "PO" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/purchase-order/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/purchase-order/action/add',
            //   },
            // ],
          },
          {
            label: 'Goods Received Notes',
            routerLink: '/main/grn/list',
            command: e => this.onPanelMenuItemClick(e.item,'GRN'),
            visible:false,
            styleClass:this.checkedMenu == "GRN" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/grn/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/grn/action/add',
            //   },
            // ],
          },
          {
            label: 'Return to Vendor',
            routerLink: '/main/rtv/list',
            command: e => this.onPanelMenuItemClick(e.item,'RTV'),
            visible:false,
            styleClass:this.checkedMenu == "RTV" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/rtv/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/rtv/action/add',
            //   },
            // ],
          },
          {
            label: 'Advance Payment',
            routerLink: '/main/advance-payment/list',
            command: e => this.onPanelMenuItemClick(e.item,'AP'),
            visible:false,
            styleClass:this.checkedMenu == "AP" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/advance-payment/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/advance-payment/action/add',
            //   },
            // ],
          },
          {
            label: 'AP invoice',
            routerLink: '/main/apinvoice/list',
            command: e => this.onPanelMenuItemClick(e.item,'API'),
            visible:false,
            styleClass:this.checkedMenu == "API" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/apinvoice/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/apinvoice/action/add',
            //   },
            // ],
          },
          {
            label: 'Payment Request',
            routerLink: '/main/payment-request/list',
            visible:true,
            command: e => this.onPanelMenuItemClick(e.item,'PAYR'),
            styleClass:this.checkedMenu == "PAYR" ? "activeData":'',
          },
          {
            label: 'Make Payment',
            routerLink: '/main/make-payment/list',
            command: e => this.onPanelMenuItemClick(e.item,'MP'),
            visible:false,
            styleClass:this.checkedMenu == "MP" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/make-payment/list',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/make-payment/action/add',
            //   },
            // ],
          },
          {
            label: 'Debit Note',
            routerLink: '/main/debit-note',
            command: e => this.onPanelMenuItemClick(e.item,'DN'),
            visible:false,
            styleClass:this.checkedMenu == "DN" ? "activeData":'',
            // items: [
            //   {
            //     label: 'List',
            //     icon: 'fa fa-list',
            //     routerLink: '/main/debit-note',
            //   },
            //   {
            //     label: 'New',
            //     icon: 'fa fa-plus',
            //     routerLink: '/main/debit-note/action/add',
            //   },
            // ],
          },
          // {
          //   label: 'Import from NS',
          //   routerLink: '/main/NetSuit/From_NS',
          //   visible:false,
          //   command: e => this.onPanelMenuItemClick(e.item,'IFNS'),
          //   styleClass:this.checkedMenu == "IFNS" ? "activeData":'',
          // },
          {
            label: 'Export to NS',
            routerLink: '/main/NetSuit/To_NS',
            visible:false,
            command: e => this.onPanelMenuItemClick(e.item,'ETNS'),
            styleClass:this.checkedMenu == "ETNS" ? "activeData":'',
          },
          
        ],
      },
      // {
      //   label: 'Setup',
      //   icon: 'fa fa-cogs',
      //   command: e => this.onPanelMenuItemClick(e.item),
      //   routerLink: null,
      //   items: [
      //     {
      //       label: 'Subsidiary',
      //       routerLink: '/main/subsidiary/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/subsidiary/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/subsidiary/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Account Code',
      //       routerLink: '/main/accountcode/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/accountcode/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/accountcode/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'General Preference',
      //       routerLink: '/main/general-preferences/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/general-preferences/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/general-preferences/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Approval Preference',
      //       routerLink: '/main/approval-preferences/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/approval-preferences/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/approval-preferences/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Tax Rate Rule',
      //       routerLink: '/main/tax-rate/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/tax-rate/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/tax-rate/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Tax Group',
      //       routerLink: '/main/tax-group/list',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/tax-group/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/tax-group/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Manage Integration',
      //       //icon: 'fa fa-hand-pointer',
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       routerLink: '/main/manage-integration/list',
      //       visible:false,
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/manage-integration/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/manage-integration/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Fiscal Calendar',
      //       routerLink: '/main/fiscalcalendar/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/fiscalcalendar/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/fiscalcalendar/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Document Sequencing',
      //       routerLink: '/main/documentsequence/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/documentsequence/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/documentsequence/list',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Company Information',
      //       routerLink: '/main/company/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/company/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/company/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'Invoice Emails',
      //       routerLink: '/main/invoice-emails/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item)
      //     },
      //     {
      //       label: 'Invoice Template',
      //       routerLink: '/main/template-mapping/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/template-mapping/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/template-mapping/action/add',
      //       //   },
      //       // ],
      //     },
      //     {
      //       label: 'User Creation',
      //       routerLink: '/main/user-creation/list',
      //       visible:false,
      //       command: e => this.onPanelMenuItemClick(e.item),
      //       // items: [
      //       //   {
      //       //     label: 'List',
      //       //     icon: 'fa fa-list',
      //       //     routerLink: '/main/template-mapping/list',
      //       //   },
      //       //   {
      //       //     label: 'New',
      //       //     icon: 'fa fa-plus',
      //       //     routerLink: '/main/template-mapping/action/add',
      //       //   },
      //       // ],
      //     },

      //   ],
      // },<i class="fa-regular fa-folder"></i>
      {
        label: 'Approval',
        icon: 'fa-regular fa-folder fa-lg',
        command: e => this.onPanelMenuItemClick(e.item),
        routerLink: null,
        items: [
          {
            label: 'Supplier Approval',
            routerLink: '/main/supplier/supplier-approval',
            visible:false,
          },
          {
            label: 'PR Approval',
            routerLink: '/main/purchases-requisition/pr-approval',
            visible:false,
          },
          {
            label: 'PO Approval',
            routerLink: '/main/purchase-order/po-approval',
            visible:false,
          },
          {
            label: 'RTV Approval',
            routerLink: '/main/rtv/rtv-approval',
            visible:false,
          },
          {
            label: 'AP Invoice Approval',
            routerLink: '/main/apinvoice/APlist',
            visible:false,
          },
          {
            label: 'Debit Note Approval',
            routerLink: '/main/debit-note/debit-note-approval',
            visible:false,
          },
          {
            label: 'Advance Payment Approval',
            routerLink: '/main/advance-payment/AP_Approval',
            visible:false,
          },
          {
            label: 'Make Payment Approval',
            routerLink: '/main/make-payment/MP_Approval',
            visible:false,
          }
        ],
      },
      {
        label: 'Report',
        icon: 'fa-solid fa-flag',
        routerLink: '/main/report_dashboard/dashboard',
        command: e => this.onPanelMenuItemClick(e.item),
      },
    ];
  }

  showDialog(position: string) {
    this.position = position;
    this.issuePopup = true;
  }

  onDialogHide() {
    this.issuePopup = false;
  }
}
