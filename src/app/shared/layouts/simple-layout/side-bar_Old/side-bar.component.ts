import { Component, OnInit } from '@angular/core';
import { CustomMenuItem } from 'src/app/core/models/menu-item.model';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  items: CustomMenuItem[] = [];
  selectedItem?: string | null = "";
  visible: boolean = false;
  user_Dtls:any;
  role_Dtls:any;
  constructor(private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private menuDataService: MenuDataService,
    private applicationStateService: ApplicationStateService) { }

    ngOnInit() {
        
    const retDetails:any = sessionStorage.getItem("LoggerDTLS");
    this.user_Dtls = JSON.parse(retDetails);

    const retRoleDetails:any = sessionStorage.getItem("RoleDTLS");
    this.role_Dtls = JSON.parse(retRoleDetails);

      this.items = this.menuDataService.getMenuList();

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

  // on menu click event
  onMenuClick(menu: CustomMenuItem) {
      // if child are available then open child
    //   let count:number;
    //   menu.Children?.forEach( array1Ttem => {
    //     this.role_Dtls[0].rolePermissions.forEach( (array2Item:any) => {
    //        if(array1Ttem.Label == array2Item.accessPoint){
    //           console.log(1);
    //           //this.toggleSubMenu(menu);
    //           //return;
    //       }
    //     })
    //   });

    //---Old
    // var Totalcount = menu.Children?.find((obj: any) => obj.Icon==undefined);

    //   if(Totalcount?.Children != null || Totalcount?.Children != undefined)
    //   {
    //     menu.Children = menu.Children?.filter(
    //         (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label && val.Icon==undefined));
         
    //   }
    //--End Old

    //----Role wise Menu
    if(menu.Children != null)
    {
var Totalcount:any = menu.Children;
var OnlyHeader=Totalcount.find((obj: any) => obj.Icon==undefined);
if(OnlyHeader != undefined)
{
for(let i=0;i<Totalcount.length;i++)
{
  for(let k=0;k<this.role_Dtls[0].rolePermissions.length;k++)
  {
      if(Totalcount[i].Label == this.role_Dtls[0].rolePermissions[k].accessPoint)
      { 
        if(Totalcount[i].Children !=null)
        {
        for(let j=0;j<Totalcount[i].Children.length;j++){
          if(this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == false) 
          {
            Totalcount[i].Children.forEach((value:any,index:any)=>{
              value.Label=="List" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
          });
          Totalcount[i].Children.forEach((value:any,index:any)=>{
            value.Label=="New" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
        });
         
        }
        else if(this.role_Dtls[0].rolePermissions[k].create == true && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == false)
          {
            Totalcount[i].Children.forEach((value:any,index:any)=>{
              value.Label=="List" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
            });
          }
          else  if(this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == true)
          {
           
           // else{
              Totalcount[i].Children.forEach((value:any,index:any)=>{
                value.Label=="New" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
              });
            //}

    
          }
          //add my line
          else if (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == true)
          {
            Totalcount[i].Children.forEach((value:any,index:any)=>{
              value.Label=="New" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
          });
          }
          //end my line
          else  if((this.role_Dtls[0].rolePermissions[k].create == true && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == false) || (this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == true && this.role_Dtls[0].rolePermissions[k].view == false))
          {
            Totalcount[i].Children.forEach((value:any,index:any)=>{
              value.Label=="List" ? Totalcount[i].Children.splice(index,1) : Totalcount[i].Children;
          });
        }
          else
          {
            // Totalcount?.filter(
            //  (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label)
            //  );
             
           // menu.Children = Totalcount;//[i].Children;
          }
        }
        }
        else{
          // if(this.role_Dtls[0].rolePermissions[k].create == false && this.role_Dtls[0].rolePermissions[k].edit == false && this.role_Dtls[0].rolePermissions[k].view == false) 
          // {
          if(Totalcount[i].Label == this.role_Dtls[0].rolePermissions[k].accessPoint &&  this.role_Dtls[0].rolePermissions[k].view == false && menu.Label=="Approval")
          {
           
            Totalcount.forEach((value:any,index:any)=>{
              Totalcount.splice(i,1);
           });
          }
         
          // else if(this.role_Dtls[0].selectedAccess == "" || this.role_Dtls[0].selectedAccess == "ADMIN" || this.role_Dtls[0].selectedAccess == "VENDOR")
          // {
          //     Totalcount.forEach((value:any,index:any)=>{
          //       Totalcount.splice(index,1);
          //    });
          //   }
       // }
        }
    // menu.Children = menu.Children?.filter(
    //   (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label && val.Icon==undefined));
   
  }
  else
          {
              menu.Children = menu.Children?.filter(
             (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label));
    
          }
}
}
//  menu.Children = menu.Children?.filter(
//    (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label));
   
}
    }
    //-End
    
    
      // menu.Children = menu.Children?.filter(
    //    (val: any) => this.role_Dtls[0].rolePermissions?.find((myArrayobj: any) => myArrayobj.accessPoint == val.Label && val.Icon==undefined));
      

    
      
      if (menu.Children != undefined || menu.Children != null) {
        this.toggleSubMenu(menu);
        return;
      }

      if (menu.RouterLink == undefined || menu.RouterLink == null || menu.RouterLink == "") {
          this.routeStateService.add("Error 404", "/error", null, false);
          return;
      }
      this.selectedItem = menu.Label;
      this.sessionService.setItem("active-menu", menu.Label);
      this.routeStateService.add(menu.Label ? menu.Label : "", menu.RouterLink, null, true);
      // hide menu bar after menu click for mobile layout
      setTimeout(() => {
          if (this.applicationStateService.getIsMobileResolution()) {
              this.visible = false;
          }
      }, 100);
  }

  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
//     menu.Children?.forEach( array1Ttem => {
//         array1Ttem.IsChildVisible =true
//         // if(array1Ttem.IsChildVisible =true{

//         //           }
//                 })
//       menu.IsChildVisible = true;
//   }
  menu.IsChildVisible=!menu.IsChildVisible;
  }
}
