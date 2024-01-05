import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { SessionService } from './core/services/session.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mbl';
  showLoader: boolean = false;
  theme: string;

  constructor(private loaderService: LoaderService,
    private themeService: ThemeService,
    private sessionService: SessionService
    ) {

    var theme = this.sessionService.getItem("selected-theme");
    if (theme != null && theme.length > 0) {
      this.theme = theme;
      this.themeService.selectTheme(theme);
    } else {
      this.theme = "theme-teal";
    }
    this.sessionService.setItem("ng-prime-language", "en");
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });
  }

  ngOnDestroy() {
    this.themeService.theme.observers.forEach(function (element) { element.complete(); });
    this.loaderService.status.observers.forEach(function (element) { element.complete(); });
  }



  
}
