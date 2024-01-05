import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { User } from 'src/app/core/models/user.model';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { MenuItem } from 'primeng/api';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  user: User | null = null;
  roleList: any = [];
  subsidiaryList: any = [];
  empName: string;
  Name: any;
  ImageUrl: any;
  dummyImgUrl: any;

  displayPosition: boolean;
  position: string;
  setupItems: MenuItem[];
  activeIndex: number = 0;
  countryList: any[] = [];
  step2: boolean = false;
  step3: boolean = false;
  step1: boolean = true;

  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private userContextService: UserContextService,
    private menuDataService: MenuDataService, private httpService: CommonHttpService
  ) {
    this.countryList = [{ id: 'India', value: 'India' }, { id: 'Bangladesh', value: 'Bangladesh' },];
  }

  hardCodeditems: MenuItem[] = [];
  items: MenuItem[] = [];
  masterItem: MenuItem[];
  visible: boolean = false;
  cstmSetupMenu: MenuItem[]; //MODIFY New menu 
  cstmMasterMenu: MenuItem[];

  profileURL: any = '../src/assets/images/avatar/ivanmagalhaes.png';
  ngOnInit() {

    window.addEventListener('storage', () => {
      if (localStorage.getItem("LoggerDTLS") == null) { //Logout from one tab then forcefully page will logout.
        this.router.navigate(['/login']);
      }
      else if (localStorage.getItem('subsidiaryChanged') != null) {
        this.router.navigate(['/main/dashboard']);
        this.Name = localStorage.getItem("LoggerDTLS");
        this.empName = this.Name.empName;

        localStorage.removeItem("subsidiaryChanged");
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    });

    var AllRoleList: any[];
    const retDetails: any = localStorage.getItem("LoggerDTLS");
    const user_Dtls = JSON.parse(retDetails);
    this.user = this.sessionService.getItem('currentUser');

    const retRoleDetails: any = localStorage.getItem("RoleDTLS");
    var role_Dtls = JSON.parse(retRoleDetails);

    //Specific Menu
    const MenuMaster = this.getModifiedList();
    MenuMaster.forEach((Item: any, index: number) => {
      role_Dtls[0].rolePermissions.some((data: any, index: number) => {
        if (data.moduleName == "Master") {

          Item.items.map((FiletrItem: any, index: number) => {
            if (data.accessPoint == FiletrItem.label) {

              if ((data.create || data.edit || data.view)) {
                FiletrItem.visible = true;
              }
            }
          });
        }
      }
      );

      MenuMaster[index].label = "";
    });

    // for(let x=0;x<MenuMaster.length;x++)
    // {
    //   if(MenuMaster[x].label == "Master")
    //   {
    //     this.cstmMasterMenu=MenuMaster
    //   }
    // }
    this.cstmMasterMenu = MenuMaster;

    const allMenus = this.getModifiedList();
    allMenus.forEach((Item: any, index: number) => {
      role_Dtls[0].rolePermissions.some((data: any, index: number) => {
        if (data.moduleName == "Setup")
        //if(data.moduleName == Item.label)
        {

          Item.items.map((FiletrItem: any, index: number) => {
            if (data.accessPoint == FiletrItem.label) {

              if ((data.create || data.edit || data.view)) {
                FiletrItem.visible = true;
              }
            }
          });
        }
      }
      );

      allMenus[index].label = "";
    });
    this.cstmSetupMenu = allMenus;

    //--End

    //For right side dropdown
    this.hardCodeditems = [
      { separator: true },
      {
        label: 'Profile Settings', icon: 'fa-regular fa-user', command: () => {
        }
      },
      {
        label: 'Change Password', icon: 'fa-solid fa-unlock-keyhole', command: () => {
          this.chnagePassword()
        }
      },
      {
        label: 'Sign Out', icon: 'fa-solid fa-arrow-right-to-bracket', command: () => {
          this.logout()
        }
      },

      // { label: 'Sign Out', icon: 'fa fa-sign-out', command: () => {
      //   this.logout()
      // } },

    ];

    this.masterItem = [
      { label: "Employee" },
      { label: "Supplier" },
      { label: "Item" }
    ]
    // end For right side dropdown

    //--Multiple Role Start

    if (localStorage.getItem("AllRoleList") != null) {
      //localStorage.setItem("AllRoleList", retRoleDetails);
      const retAllRoleList: any = localStorage.getItem("AllRoleList");
      AllRoleList = JSON.parse(retAllRoleList);

      for (let i = 0; i < AllRoleList.length; i++) {
        if (role_Dtls[0].subsidiaryId == AllRoleList[i].subsidiaryId) {
          this.items.push({
            //"icon":'fa fa-check checkSelected',
            icon: "pi pi-building",
            styleClass: "p-button-success",
            "label": AllRoleList[i].subsidiaryName,
            command: () => {
              this.gnGetSubsidiarywiseRoleDetails(AllRoleList[i].subsidiaryId)
            }
          });
        }
        else {
          this.items.push({
            //"icon":'fa fa-minus abc',
            icon: "pi pi-building",
            "label": AllRoleList[i].subsidiaryName,
            command: () => {
              this.gnGetSubsidiarywiseRoleDetails(AllRoleList[i].subsidiaryId)
            }
          });
          this.items.push({
            separator: true,
          });
        }
      }
      if (user_Dtls.userType == "SUPERADMIN") //--Access to add New Subsidiary
     {
      this.items.push({
        separator: true,
      });

        this.items.push({
          "icon": 'fa fa-add',
          "label": 'Add Another Subsidiary',
          styleClass: "topUserPerMenu",
          command: () => {
            this.addNewSubsidiary()
          },
        })
      
      }
      this.items.push({
        separator: true,
      });
      this.items.push({
        icon: 'signOut',
        // label: user_Dtls.username+"\n" +"Anirban Haldar",
        label: user_Dtls.empName + "\n" + user_Dtls.username,
        styleClass: 'topUserMenu',
      })
    }


    //Add Hard Coded Menus
    for (let x = 0; x < this.hardCodeditems.length; x++) {
      if (x == 0) { this.items.push({ 'separator': true }) }
      if(this.hardCodeditems[x].label != undefined)
     { this.items.push({
        "icon": this.hardCodeditems[x].icon,
        "label": this.hardCodeditems[x].label,
        "command": this.hardCodeditems[x].command
      })
    }
    }

    //--Multiple Role End

    //#pradeep - assigning to dummy user here. This can be removed once the actual login is in place.
    let loggedinUser = new User();
    loggedinUser.departmentName = role_Dtls[0].name;
    loggedinUser.username = user_Dtls.username;
    loggedinUser.email = user_Dtls.email;
    loggedinUser.image = user_Dtls.image;
    //console.log(user_Dtls.image);
    //loggedinUser.role = 'Admin';
    loggedinUser.birthDate = new Date();
    loggedinUser.userId = user_Dtls.id;
    this.user = loggedinUser;
    this.user.subsidiaryName = role_Dtls[0].subsidiaryName;
    this.user.selectedAccess = role_Dtls[0].selectedAccess;


    //For Setup Progressbar
    let progressBar: HTMLElement | null = document.querySelector(".circular-progress");
    let valueContainer: HTMLElement | null = document.querySelector(".value-container");
    let progressValue: number = 0;
    let progressEndValue: number = 60;
    let speed: number = 70;

    let progress = setInterval(() => {
      progressValue++;
      if (progressBar) {
        progressBar.style.background = `conic-gradient(
          #103a75 ${progressValue * 1.6}deg,
          #186ADE ${progressValue * 3.6}deg,
          #F0F1F3 ${progressValue * 2}deg
        )`;
      }
      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    //End For Setup Progressbar

    //For User Image
    this.dummyImgUrl = "../../assets/cimages/amyelsner.png ";
    this.user.image = this.dummyImgUrl;

    if (user_Dtls.image != null) {
      var splitres = user_Dtls.image.toString()?.split(",")
      user_Dtls.image = splitres[1];
      user_Dtls.image = splitres[0];
      // this.user.image = user_Dtls.image;
    }


    // if (loggedinUser.image== null){
    //   this.ImageUrl="../../assets/cimages/amyelsner.png ";
    //   this.user.image =this.ImageUrl;
    // }else{
    //   this.user.image == user_Dtls.image;
    // }
    //End For User Image

    //For Setup Module
    //this.displayPosition = true; 

    this.setupItems = [{
      label: 'Setup 1',
      styleClass: 'iconcheck',
      // routerLink:'setup1',
      command: (event: any) => {
        this.activeIndex = 0;

      }
    },
    {
      label: 'Setup 2',
      styleClass: 'iconcheck',
      // routerLink:'setup2',
      command: (event: any) => {
        this.activeIndex = 1;

      }
    },
    {
      label: 'Setup 3',
      styleClass: 'iconcheck',
      //routerLink:'setup3',
      command: (event: any) => {
        this.activeIndex = 2;

      }
    },
    ];




  }

  // assignMode(action:string){
  //   switch(action){
  //     case 'step1':
  //       this.step1=true;
  //       this.step2=false;
  //       this.step3=false;
  //       break;
  //     case 'step2':
  //       this.step1=false;
  //       this.step2=true;
  //       this.step3=false;
  //       break;
  //     case 'step3':
  //       this.step1=false;
  //       this.step2=false;
  //       this.step3=true;
  //   }
  // }
  //For Setup Module
  showPositionDialog(position: string) {
    this.position = "top-right";
    this.displayPosition = true;
  }
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  next() {
    //this.assignMode();
    this.activeIndex += 1;
    if (this.activeIndex == 1) {
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
    } else if (this.activeIndex == 2) {
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
    }
  }


  chnagePassword() {
    localStorage.clear();
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    let UserMailId: any = this.user?.username
    localStorage.setItem("LoggerUserName", UserMailId);
    this.router.navigate(['forgot']);

    //
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');


  }

  // showNotificationSidebar() {
  //   this.displayNotifications = true;
  // }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);

  }
  gnGetSubsidiarywiseRoleDetails(selectedSubsidiary: any) {
    const role_Dtls: any = localStorage.getItem("AllRoleList");
    const parsedRld = JSON.parse(role_Dtls);
    if (parsedRld[0].subsidiaryId == null) {
      this.router.navigate(['/main/dashboard/cfo_dashboard']);
    } else {
      const tempRoleList: any = []
      for (let x = 0; x < parsedRld.length; x++) {
        if (parsedRld[x].subsidiaryId == selectedSubsidiary) {
          if (localStorage.getItem("RoleDTLS") != null) {
            localStorage.removeItem("RoleDTLS");
            localStorage.removeItem("subsidiaryChanged");
          }
          tempRoleList.push(parsedRld[x]);
          localStorage.setItem("RoleDTLS", JSON.stringify(tempRoleList));
          localStorage.setItem("subsidiaryChanged", 'DataChanged');
          this.router.navigate(['/main/dashboard']);
          //window.location.reload();
          let AllRoleList_: any = localStorage.getItem('AllRoleList');
          var LoggerDTLS_: any = localStorage.getItem('LoggerDTLS');
          var RoleDTLS_: any = localStorage.getItem('RoleDTLS');
          localStorage.clear();
          localStorage.setItem('AllRoleList', AllRoleList_);
          localStorage.setItem('LoggerDTLS', LoggerDTLS_);
          localStorage.setItem('RoleDTLS', RoleDTLS_);
          setTimeout(() => { window.location.reload(); }, 600);
          break;
        }
      }

    }
  }
  fnGetRoleDetail(selectedData: any) {
    let rList: any = [];
    rList.push(selectedData);

    this.httpService.Insert('masters-ws/roles/get-by-ids', rList).subscribe(
      (res: any) => {
        if (res != undefined) {
          if (localStorage.getItem("RoleDTLS") != null) {
            localStorage.removeItem("RoleDTLS");
          }
          localStorage.setItem("RoleDTLS", JSON.stringify(res.sort((a: any, b: any) => a.id - b.id)));
          this.router.navigate(['/main/dashboard']);
          //window.location.reload();
          setTimeout(() => { window.location.reload(); }, 600);
        }
        else {
          alert("No Data Found Against Role");
        }
      },
      (error: any) => {
        alert(error);
      }
    );
  }

  getModifiedList(): MenuItem[] {
    return [
      {
        label: 'Master',
        icon: 'fa fa-building',
        //command: e => this.onPanelMenuItemClick(e.item),
        routerLink: null,
        items: [

          {
            label: 'Employee',
            routerLink: '/main/employee/list',
            //:"<img src='https://www.primefaces.org/wp-content/uploads/fbrfg/favicon-32x32.png'></img>",
            //icon:'fa fa-user-tie',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Supplier',
            routerLink: '/main/supplier/list',
            //icon:'fa fa-truck headingIcon',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Item',
            routerLink: '/main/item/list',
            //icon: 'fa fa-list',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Bank',
            routerLink: '/main/bankmaster/list',
            //icon: 'fa fa-bank',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },

          {
            label: 'Location',
            routerLink: '/main/locationmaster/list',
            //icon:'fa fa-map-marker',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Project',
            routerLink: '/main/project/list',
            //icon:'fa fa-hands-holding-child',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Department',
            routerLink: '/main/department/list',
            //icon:'fa fa-hands-holding-child',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },
          {
            label: 'Currency',
            routerLink: '/main/currency/list',
            //icon:'fa fa-dollar',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,
          },
          {
            label: 'Role',
            routerLink: '/main/role/list',
            //icon:'fa fa-person-circle-question',
            //command: e => this.onPanelMenuItemClick(e.item),
            visible: false,

          },

        ],
      },
      {
        label: 'Setup',
        icon: 'fa fa-cogs',
        routerLink: null,
        items: [
          {
            label: 'Subsidiary',
            routerLink: '/main/subsidiary/list',
            visible: false,
          },
          {
            label: 'Account Code',
            routerLink: '/main/accountcode/list',
            visible: false,
          },
          {
            label: 'General Preference',
            routerLink: '/main/general-preferences/list',
            visible: false,
          },
          {
            label: 'Approval Preference',
            routerLink: '/main/approval-preferences/list',
            visible: false,
          },
          {
            label: 'Tax Rate Rule',
            routerLink: '/main/tax-rate/list',
            visible: false,
          },
          {
            label: 'Tax Group',
            routerLink: '/main/tax-group/list',
            visible: false,
          },
          {
            label: 'Manage Integration',
            routerLink: '/main/manage-integration/list',
            visible: false,
          },
          {
            label: 'Fiscal Calendar',
            routerLink: '/main/fiscalcalendar/list',
            visible: false,
          },
          {
            label: 'Document Sequencing',
            routerLink: '/main/documentsequence/list',
            visible: false,
          },
          {
            label: 'Company Information',
            routerLink: '/main/company/list',
            visible: false,
          },
          {
            label: 'Invoice Emails',
            routerLink: '/main/invoice-emails/list',
            visible: false,
          },
          {
            label: 'Invoice Template',
            routerLink: '/main/template-mapping/list',
            visible: false,
          },
          {
            label: 'User Creation',
            routerLink: '/main/user-creation/list',
            visible: false,
          },
          {
            label: 'Payment Term',
            routerLink: '/main/payment-term/list',
            visible: false,
          },
        ],
      },

    ];
  }

  addNewSubsidiary() {
    this.router.navigate(['/main/subsidiary/action', 'add']);
  }
}
