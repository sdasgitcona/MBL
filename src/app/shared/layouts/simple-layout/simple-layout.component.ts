import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';
import { MenuDataService } from 'src/app/core/services/menu-data.service';

@Component({
  selector: 'app-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss']
})
export class SimpleLayoutComponent implements OnInit {
  isMenuVisible: boolean = true;

  constructor(private menuDataService: MenuDataService,
    private applicationStateService: ApplicationStateService) { }

  ngOnInit() {
    var that = this;
    this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
      if (data && data != null) {
        that.isMenuVisible = !that.isMenuVisible;
      }
    });

    if (this.applicationStateService.getIsMobileResolution()) {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }

  ngOnDestroy() {
    this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
  }

}
