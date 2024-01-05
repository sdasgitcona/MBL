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
import { color } from '@amcharts/amcharts5';
import{LoginDetails,StepOne,CountryModel,StateModel,CityModel,StepTwo,type,StepThree,Role,Department,BusinessUnit} from '../top-bar/model/topbar-model';
import { ToastService } from 'src/app/core/services/toast.service';
import { AddressService } from './service/address.service';

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
  Name:any;
  ImageUrl:any;
  dummyImgUrl:any;
  RetloginDetails:any;
  RloginDetails:any;
  displayPosition: boolean;
  position: string;
  setupItems: MenuItem[];
  activeIndex: number = 0;
  countryList:any[]=[];
  Step_Two:StepTwo[]=[];
  Step_Three:StepThree[]=[];
  Step_Three_View:StepThree[]=[];
  step2:boolean=false;
  step3:boolean=false;
  step1:boolean=true;
  showloader:boolean = false;
  companyname:any;
  Fiscaleyear:any;
  Fiscalemonth:any;
  loginDetails:LoginDetails=new LoginDetails();
  states: StateModel[] = [];
  department: string[] = [];
  businessUnit: string[] = [];
  StepOne:StepOne=new StepOne();
  StepTwo:StepTwo=new StepTwo();
  StepThree:StepThree=new StepThree();
  types:any[] = [];
  Role:Role[]=[];
  departmentStepThree:Department[]=[];
  businessUnitStepThree:BusinessUnit[]=[];
  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private userContextService: UserContextService,
    private menuDataService: MenuDataService, private httpService: CommonHttpService,private addressService: AddressService,private toastService: ToastService
  ) {
    this.countryList = [{id:'India', value:'India'},{id:'Bangladesh', value:'Bangladesh'},];
    this.Fiscaleyear=[{value:'2022', id:'2022'},{value:'2023', id:'2023'},{value:'2024', id:'2024'},{value:'2025', id:'2025'},];
    this.Fiscalemonth=[{value:'January', id:'January'},{value:'February', id:'February'},{value:'March', id:'March'},{value:'April', id:'April'},{value:'May', id:'May'},{value:'June', id:'June'},{value:'July', id:'July'},{value:'August', id:'August'},{value:'September', id:'September'},{value:'October', id:'October'},{value:'November', id:'November'},{value:'December', id:'December'}];
   }

  hardCodeditems:MenuItem[]=[];
  items: MenuItem[]=[];
  masterItem: MenuItem[];
  visible: boolean = false;
  cstmSetupMenu: MenuItem[]; //MODIFY New menu 
  cstmMasterMenu: MenuItem[];
 
  profileURL:any='../src/assets/images/avatar/ivanmagalhaes.png';
  ngOnInit() {

    this.GenrateAccessTokenAndGetCountries();
  
   window.addEventListener('storage', () => {
    if(localStorage.getItem("LoggerDTLS") == null){ //Logout from one tab then forcefully page will logout.
      this.router.navigate(['/login']);
    }
    else if(localStorage.getItem('subsidiaryChanged') != null)
    {
      this.router.navigate(['/main/dashboard']);
      this.Name=localStorage.getItem("LoggerDTLS");
      this.empName=this.Name.empName;

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
        if (data.moduleName == "Master")
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
        label: 'Issue Tracker', icon: 'fa-solid fa-triangle-exclamation', routerLink: '/main/issue/list', command: () => {
          this.issueTracker();
        }
      },
      { label: 'Profile Settings', icon: 'fa-regular fa-user',command: () => {
      }},
      { label: 'Change Password', icon: 'fa-solid fa-unlock-keyhole', command: () => {
        this.chnagePassword()
      }},
      { label: 'Sign Out', icon: 'fa-solid fa-arrow-right-to-bracket', command: () => {
        this.logout()
      } },
      
      // { label: 'Sign Out', icon: 'fa fa-sign-out', command: () => {
      //   this.logout()
      // } },

    ];

    this.masterItem = [
      {label: "Employee"},
      {label: "Supplier"},
      {label: "Item"}
    ]
    // end For right side dropdown

    //--Multiple Role Start

     if (localStorage.getItem("AllRoleList") != null) {
       //localStorage.setItem("AllRoleList", retRoleDetails);
       const retAllRoleList: any = localStorage.getItem("AllRoleList");
       AllRoleList = JSON.parse(retAllRoleList);

       for(let i=0;i<AllRoleList.length;i++)
            {
              if(role_Dtls[0].subsidiaryId == AllRoleList[i].subsidiaryId)
       { this.items.push({
        //"icon":'fa fa-check checkSelected',
        icon:"pi pi-building",
        styleClass:"p-button-success",
        "label": AllRoleList[i].subsidiaryName,
        command: () => {
          this.gnGetSubsidiarywiseRoleDetails(AllRoleList[i].subsidiaryId)
        }
      });}    
        else
        {
          this.items.push({
            //"icon":'fa fa-minus abc',
            icon:"pi pi-building",
            "label": AllRoleList[i].subsidiaryName,
            command: () => {
              this.gnGetSubsidiarywiseRoleDetails(AllRoleList[i].subsidiaryId)
            }
          });
          this.items.push({
            separator: true ,
         });
        }
            }
           
            this.items.push({
        "icon":'fa fa-add',
        "label":'Add Another Subsidiary',
        styleClass:"topUserPerMenu",
        command: () => {
          this.addNewSubsidiary()
        }
            })
            this.items.push({
              separator: true ,
           })
            this.items.push({
              icon:'signOut', 
              // label: user_Dtls.username+"\n" +"Anirban Haldar",
              label: user_Dtls.empName +"\n"+user_Dtls.username,
              styleClass:'topUserMenu',
                  })
     }
    

     //Add Hard Coded Menus
     for(let x=0;x<this.hardCodeditems.length;x++)
     {
      if(x==0){this.items.push({'separator': true })}
      this.items.push({
        "icon": this.hardCodeditems[x].icon,
        "label": this.hardCodeditems[x].label,
        "command": this.hardCodeditems[x].command
      })
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
    this.user.subsidiaryName=role_Dtls[0].subsidiaryName;
    this.user.selectedAccess=role_Dtls[0].selectedAccess;
   

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
this.dummyImgUrl="../../assets/cimages/amyelsner.png ";
this.user.image =this.dummyImgUrl;

if(user_Dtls.image !=null){
  var splitres=user_Dtls.image.toString()?.split(",")
      user_Dtls.image=splitres[1];
      user_Dtls.image=splitres[0];
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
this.showPositionDialog('top-right');

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
//onload popup showing
showPositionDialog(position: string) {
  let details:any;
  const LDetails: any = localStorage.getItem("LoggerDTLS");
  this.RetloginDetails = JSON.parse(LDetails);
  const RDetails: any = localStorage.getItem("RoleDTLS");
  this.RloginDetails = JSON.parse(RDetails);
  
  //this.RetloginDetails.stepCompleted=null;
  //this.RetloginDetails.stepCompleted=1;
  //this.RetloginDetails.stepCompleted=2;

 if(this.RetloginDetails.stepCompleted==null || this.RetloginDetails.stepCompleted==0)
     {
      this.loadCompanyData();
      this.loadBusinessUnit();
      this.loadDepartment();
      this.position = "top-right";
      this.displayPosition = true;
      this.activeIndex+= 0;
      this.step1=true;
      this.step2=false;
      this.step3=false;
     }
     else if(this.RetloginDetails.stepCompleted==1)
     {
      this.loadCompanyData();
      setTimeout(() => {this.loadTypeforStep2();},1000);
      this.position = "top-right";
      this.displayPosition = true;
      this.activeIndex+= 1;
      this.step1=false;
      this.step2=true;
      this.step3=false;
     }
     else if(this.RetloginDetails.stepCompleted==2)
     {
      this.loadBusinessUnitStepThree();
      this.loadDepartmentStepThree();
      this.loadRole();
      this.position = "top-right";
      this.displayPosition = true;
      this.activeIndex+= 2;
      this.step1=false;
      this.step2=false;
      this.step3=true;
     }
     else if(this.RetloginDetails.stepCompleted==3)
     {

      
     }


}
onActiveIndexChange(event: number) {
  this.activeIndex = event;
}

//next button on click popup
next(){
  
  //this.assignMode();
 if(this.activeIndex==0)
 {
  
  if(this.StepOne.companyName==undefined || this.StepOne.companyName=="")
      {
        this.showAlert("Please Enter Company Name");
        return;
      }
      else if(this.StepOne.country==undefined || this.StepOne.country=="")
      {
        this.showAlert("Please Select Country");
        return;
      }
      else if(this.StepOne.state==undefined || this.StepOne.state=="")
      {
        this.showAlert("Please Select State");
        return;
      }
      else if(this.StepOne.city==undefined || this.StepOne.city=="")
      {
        this.showAlert("Please Select City");
        return;
      }
      else if(this.StepOne.address1==undefined || this.StepOne.address1=="")
      {
        this.showAlert("Please enter Address1");
        return;
      }
      else if(this.StepOne.poCode==undefined || this.StepOne.poCode=="")
      {
        this.showAlert("Please enter Pocode");
        return;
      }
      else if(this.StepOne.startYear==undefined || this.StepOne.startYear=="")
      {
        this.showAlert("Please select Startyear");
        return;
      }
      else if(this.StepOne.startMonth==undefined || this.StepOne.startMonth=="")
      {
        this.showAlert("Please select Startmonth");
        return;

      }
      else if(this.StepOne.endMonth==undefined || this.StepOne.endMonth=="")
      {
        this.showAlert("Please select Endmonth");
        return;
      }
      else if(this.businessUnit==undefined || this.businessUnit.length==0|| this.businessUnit==null)
      {
        this.showAlert("Please select Businessunit");
        return;
      }
      else if(this.department==undefined || this.department.length==0)
      {
        this.showAlert("Please select Department");
        return;
      }
      else
      {
        this.saveStepOne();
      }

 
 }


 
  else if(this.activeIndex==1){
    this.loadCompanyData();
    setTimeout(() => {this.loadTypeforStep2();},500);
    this.step1=false;
    this.step2=true;
    this.step3=false;
    for(let i=0;i<this.Step_Two.length;i++)
    {
      if(this.Step_Two[i].type==undefined)
      {
        this.showAlert("Please Select Type");
        return;
      }
      if(this.Step_Two[i].prefix==undefined)
      {
        this.showAlert("Please enter prefix");
        return;
      }
      if(this.Step_Two[i].suffix==undefined)
      {
        this.showAlert("Please enter suffix");
        return;
      }
      if(this.Step_Two[i].minimumDigit==undefined)
      {
        this.showAlert("Please enter Max Digit");
        return;
      }
      if(this.Step_Two[i].initialNumber==undefined)
      {
        this.showAlert("Please enter Initial Number");
        return;
      }
      if(this.Step_Two[i].startDate==undefined)
      {
        this.showAlert("Please enter Start Date");
        return;
      }
      if(this.Step_Two[i].endDate==undefined)
      {
        this.showAlert("Please enter End Date");
        return;
      }
    }
    this.saveStepTwo();
  }else if(this.activeIndex==2){
    this.step1=false;
    this.step2=false;
    this.step3=true;
    this.saveStepThree();
  }
  
}


chnagePassword()
{
  localStorage.clear();
  this.userIdle.stopWatching();
  this.routeStateService.removeAll();
  this.userContextService.logout();
  this.sessionService.removeItem('active-menu');
  let UserMailId:any=this.user?.username
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
  gnGetSubsidiarywiseRoleDetails(selectedSubsidiary: any)
  {
    const role_Dtls: any = localStorage.getItem("AllRoleList");
    const parsedRld = JSON.parse(role_Dtls);
    if (parsedRld[0].subsidiaryId == null) {
      this.router.navigate(['/main/dashboard/cfo_dashboard']);
    } else {
      const tempRoleList:any=[]
      for (let x=0;x<parsedRld.length;x++)
      {
        if(parsedRld[x].subsidiaryId == selectedSubsidiary)
        {
          if (localStorage.getItem("RoleDTLS") != null) {
            localStorage.removeItem("RoleDTLS");
            localStorage.removeItem("subsidiaryChanged");
          }
          tempRoleList.push(parsedRld[x]);
          localStorage.setItem("RoleDTLS", JSON.stringify(tempRoleList));
          localStorage.setItem("subsidiaryChanged", 'DataChanged');
          this.router.navigate(['/main/dashboard']);
          //window.location.reload();
          let AllRoleList_:any= localStorage.getItem('AllRoleList');
           var LoggerDTLS_:any= localStorage.getItem('LoggerDTLS');
            var RoleDTLS_:any= localStorage.getItem('RoleDTLS');
            localStorage.clear();
            localStorage.setItem('AllRoleList',AllRoleList_);
            localStorage.setItem('LoggerDTLS',LoggerDTLS_);
            localStorage.setItem('RoleDTLS',RoleDTLS_);
          setTimeout(() => {window.location.reload();},600);
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
          setTimeout(() => {window.location.reload();},600);
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

        ],
      },

    ];
  }

  addNewSubsidiary(){
    this.router.navigate(['/main/subsidiary/action', 'add']);
  }
  /*Start Fetch County List api access token */
  GenrateAccessTokenAndGetCountries() {
    this.addressService.GetAccessToken().subscribe(
      (res) => {
        console.log(res);
        //this.countryviewModels=res;
        this.GetCountryList();
      },
      (error) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  /*Start Fetch County List */
  countries: CountryModel[] = [];
  GetCountryList() {
    this.addressService.GetCountryList().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
        this.countries.map((item) => {
          item.country = item.country_name;
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
  /* End Fetch County List */

    // Adsress country state city binding
    GetStateListInit(country: any) {
      if (country) {
         this.addressService.GetStateList(country).subscribe((res) => {
          console.log(res);
          this.states = res;
          this.states.map((item) => {
            item.state = item.state_name;
          });
        });
      }
    }
    GetStateList(country: any) {
      if (country) {
         this.addressService.GetStateList(country.value).subscribe((res) => {
          console.log(res);
          this.states = res;
          this.states.map((item) => {
            item.state = item.state_name;
          });
        });
      }
    }
  
    // Adsress country state city binding
    cities: CityModel[] = [];
    GetCityList(state: any) {
      if (state) {
        this.addressService.GetCityList(state.value).subscribe((res) => {
          console.log(res);
          this.cities = res;
          this.cities.map((item) => {
            item.city = item.city_name;
          });
        });
      }
    }
// step 1 save
    saveStepOne()
    {
      this.showloader=true;
      this.StepOne.businessUnits=[];
      for(let i=0;i<this.businessUnit.length;i++)
      {
       this.StepOne.businessUnits.push(this.businessUnit[i]);
      }
      this.StepOne.departments=[];
      for(let i=0;i<this.department.length;i++)
      {
       this.StepOne.departments.push(this.department[i]);
      }
         
      this.StepOne.accountId=this.RetloginDetails.accountId;
      this.StepOne.subsidiaryId=this.RloginDetails[0].subsidiaryId;
      this.StepOne.mail=this.RetloginDetails.email;
      this.httpService.Insert('/setup-ws/customer/register/step/one', this.StepOne,this.RetloginDetails.token)
    .subscribe((res) => {
      if(res.status == 401)
      { 
        this.showAlert("Unauthorized Access !");
        this.router.navigate(['/login']);
      }
      else if(res.status == 404)
      { 
        this.showAlert("Wrong/Invalid Token!");
        this.router.navigate(['/login']);
      }
      else
      {

        if (res) {
          this.showSuccess();
          this.showloader=false;
          this.activeIndex+= 1;
          this.loadCompanyData();
          setTimeout(() => {this.loadTypeforStep2();},500);
          this.position = "top-right";
          this.displayPosition = true;
          this.activeIndex+= 1;
          this.step1=false;
          this.step2=true;
          this.step3=false;

        } else if(res.errorMessage != undefined)
        {
          this.showAlert(res.errorMessage);
          this.showloader=false;
        }
        else {
          this.showError();
          this.showloader=false;
        }
      }
      },
      error => {
        this.showAlert(error);
        this.showloader=false;
       },
       () => {
         // 'onCompleted' callback.
         // No errors, route to new page here
       });
    }
    //stp 2 save
    saveStepTwo()
    {
      this.showloader=true;
     const retRoleDetails: any = localStorage.getItem("RoleDTLS");
     var role_Dtls = JSON.parse(retRoleDetails);
     for(let i=0;i<this.Step_Two.length;i++)
     {
      this.Step_Two[i].subsidiaryId=role_Dtls[0].subsidiaryId;
      this.Step_Two[i].createdBy=this.RetloginDetails.email;
      this.Step_Two[i].lastModifiedBy=this.RetloginDetails.email;
     }

     


    this.httpService.Insert('/setup-ws/customer/register/step/two', this.Step_Two,this.RetloginDetails.token)
    .subscribe((res) => {
      if(res.status == 401)
      { 
        this.showAlert("Unauthorized Access !");
        this.router.navigate(['/login']);
      }
      else if(res.status == 404)
      { 
        this.showAlert("Wrong/Invalid Token!");
        this.router.navigate(['/login']);
      }
      else
      {

        if (res) {
          this.showSuccess();
          this.showloader=false;
          this.activeIndex+= 1;
          this.loadBusinessUnitStepThree();
          this.loadDepartmentStepThree();
          this.loadRole();
          this.position = "top-right";
          this.displayPosition = true;
          this.activeIndex+= 2;
          this.step1=false;
          this.step2=false;
          this.step3=true;

        } else if(res.errorMessage != undefined)
        {
          this.showAlert(res.errorMessage);
          this.showloader=false;
        }
        else {
          this.showError();
          this.showloader=false;
        }
      }
      },
      error => {
        this.showAlert(error);
        this.showloader=false;
       },
       () => {
         // 'onCompleted' callback.
         // No errors, route to new page here
       });
    }
    ///step 3 save
    saveStepThree()
    {
    this.showloader=true;
    this.httpService.Insert('/setup-ws/customer/register/step/three', this.Step_Three,this.RetloginDetails.token)
    .subscribe((res) => {
      if(res.status == 401)
      { 
        this.showAlert("Unauthorized Access !");
        this.router.navigate(['/login']);
      }
      else if(res.status == 404)
      { 
        this.showAlert("Wrong/Invalid Token!");
        this.router.navigate(['/login']);
      }
      else
      {

        if (res) {
          this.showSuccess();
          this.showloader=false;

        } else if(res.errorMessage != undefined)
        {
          this.showAlert(res.errorMessage);
          this.showloader=false;
        }
        else {
          this.showError();
          this.showloader=false;
        }
      }
      },
      error => {
        this.showAlert(error);
        this.showloader=false;
       },
       () => {
         // 'onCompleted' callback.
         // No errors, route to new page here
       });
    }


    showAlert(AlertMSG:any) {
      this.toastService.addSingle(
        'error',
        'Error',
        AlertMSG
      );
    }


    showError() {
      this.toastService.addSingle(
        'error',
        'Error',
        'Error occured while saving settings!'
      );
    }

    showSuccess() {
      this.toastService.addSingle(
        'success',
        'Success',
        'settings Saved Successfully!'
      );
    }

    //load business unit for step 1
    loadBusinessUnit()
    {
      this.httpService.GetAll("/setup-ws/operating-unit/get-by-subsidiary-id?subsidiaryId="+this.RloginDetails[0].subsidiaryId,this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
        this.StepOne.businessUnits=[];
         for(let i=0;i<res.length;i++)
         {
          this.StepOne.businessUnits.push(res[i].name);
         }
         this.businessUnit=this.StepOne.businessUnits;
       
       }
      });
    }
//load business unit for step three
    loadBusinessUnitStepThree()
    {
      this.httpService.GetAll("/setup-ws/operating-unit/get-by-subsidiary-id?subsidiaryId="+this.RloginDetails[0].subsidiaryId,this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
        this.businessUnitStepThree=[];
         for(let i=0;i<res.length;i++)
         {
          this.businessUnitStepThree.push({id:res[i].id,Name:res[i].name});
         }
         
       
       }
      });
    }
///load separtment for step1
    loadDepartment()
    {
      this.httpService.GetAll("/masters-ws/department/get-department-by-subsidiary?subsidiaryId="+this.RloginDetails[0].subsidiaryId,this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
        this.StepOne.departments=[];
         for(let i=0;i<res.length;i++)
         {
          this.StepOne.departments.push(res[i].departmentName);
         }
         this.department=this.StepOne.departments;
      
       }
      });
    }
//load department for step 3
    loadDepartmentStepThree()
    {
      this.httpService.GetAll("/masters-ws/department/get-department-by-subsidiary?subsidiaryId="+this.RloginDetails[0].subsidiaryId,this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
        this.departmentStepThree=[];
         for(let i=0;i<res.length;i++)
         {
          this.departmentStepThree.push({id:res[i].id,Name:res[i].departmentName});
         }
         
      
       }
      });
    }
///load role for step2
    loadRole()
    {
      role_:[]=[];
      this.httpService.GetAll("/masters-ws/roles/get-roles-by-subsidiary?subsidiaryId="+this.RloginDetails[0].subsidiaryId+"&accessType=APPROVER,ADMIN,EMPLOYEE",this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
         this.Role=[];
         for(let i=0;i<res.length;i++)
         {
          this.Role.push({
            id:res[i].id,
            selectedAccess:res[i].selectedAccess
          })

         }
         
      
       }
      });
    }
////load company data for step1
    loadCompanyData()
    {
      this.httpService.GetAll("/setup-ws/company-data/get-by-account-id?accountId="+this.RetloginDetails.accountId,this.RetloginDetails.token)
      .subscribe(res => {
       if(res.status == 401)
       { 
         this.router.navigate(['/login']);
       }
       else if(res.status == 404)
       { 
          this.router.navigate(['/login']);
        }
       else
       {
        this.StepOne.companyName=res.companyName;
        this.StepOne.country=res.country;
        this.StepOne.companyId=res.mblId;
        setTimeout(() => {this.GetStateListInit(this.StepOne.country);},600);
              
       
       }
      });
    
    }
///remove dept frostep1
    removedept(event:any){
       
      for(let i=0;i<this.StepOne.departments.length;i++)
      { 
        if(this.StepOne.departments[i]==event.value)
        {
            this.department.push(event.value);
            return;
        }

      }

    }
///remove unit from step1
    removebUnit(event:any)
    {
      for(let i=0;i<this.StepOne.businessUnits.length;i++)
      { 
        if(this.StepOne.businessUnits[i]==event.value)
        {
          //return;
            this.businessUnit.push(event.value);
            return;
         
        }

      }
    }
//add row for step2
    addstep2()
    {
      if (this.Step_Two.length > 0 && this.Step_Two[length - 1] == new StepTwo() ) 
  
      {
        
        return;
      }
    
      this.Step_Two.push(new StepTwo());
    }
////bind type for step2
    loadTypeforStep2()
    {
      var details=null;
      this.httpService.GetAll_company("/appdata/get?id="+ this.StepOne.companyId)
        .subscribe(res => {
         if(res.status == 401)
         { 
           this.router.navigate(['/login']);
         }
         else if(res.status == 404)
         { 
            this.router.navigate(['/login']);
          }
         else
         {
          if(res)
          {
            
              for(let i=0;i<res.appAvailable.length;i++)
              {
                 this.types.push(res.appAvailable[i].available);
               }
          }
          
                
         
         }
        });
              
  

    }

/////Save data for step3 and add in queue
    addDataStepThree()
    {
      debugger
      if(this.StepThree.name==undefined)
      {
        this.showAlert("Please enter Name");
        return;
      }
      else if(this.StepThree.email==undefined)
      {
        this.showAlert("Please enter Email");
        return;
      }
      
      else if(this.StepThree.businessUnitId==undefined)
      {
        this.showAlert("Please Select Business Unit");
        return;
      }
      else if(this.StepThree.departmentId==undefined)
      {
        this.showAlert("Please Select Department");
        return;
      }
      else if(this.StepThree.roleId==undefined)
      {
        this.showAlert("Please Select Role");
        return;
      }
      else
      {
        this.Step_Three=[];
        const retRoleDetails: any = localStorage.getItem("RoleDTLS");
        var role_Dtls = JSON.parse(retRoleDetails);
          this.Step_Three.push({
          email:this.StepThree.email,
          name:this.StepThree.name,
          accountId:this.RetloginDetails.accountId,
          subsidiaryId:role_Dtls[0].subsidiaryId,
          departmentId:this.StepThree.departmentId,
          roleId:this.StepThree.roleId,
          selectedAccess:this.Role.find((x:any)=>x.id==this.StepThree.roleId)?.selectedAccess,
          businessUnitId:this.StepThree.businessUnitId,
          createdBy:this.RetloginDetails.email
       })
       this.Step_Three_View.push({
        email:this.StepThree.email,
        name:this.StepThree.name,
        accountId:this.RetloginDetails.accountId,
        subsidiaryId:role_Dtls[0].subsidiaryId,
        departmentId:this.StepThree.departmentId,
        roleId:this.StepThree.roleId,
        selectedAccess:this.Role.find((x:any)=>x.id==this.StepThree.roleId)?.selectedAccess,
        businessUnitId:this.StepThree.businessUnitId,
        createdBy:this.RetloginDetails.email
     })
        this.saveStepThree();
        this.resetStepThree();
      }
  
    }
 /// Reset data for step 3
    resetStepThree()
    {
      this.StepThree.email=undefined;
      this.StepThree.name=undefined;
      this.RetloginDetails.accountId=undefined;
      this.StepThree.departmentId=undefined;
      this.StepThree.roleId=undefined;
      this.StepThree.businessUnitId=undefined;
    }
//// Hide popup for step 3
    hidePopup()
    {
      this.Step_Three_View=[];
      this.displayPosition=false;
       
    }

    issueTracker() {
      this.router.navigate(['/main/issue/list']);
    }

}
