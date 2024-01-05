import { Component, OnInit, Inject, PLATFORM_ID, NgZone, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from "@amcharts/amcharts5";
import * as am5core from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-country-wise-supplier-pie',
  templateUrl: './country-wise-supplier-pie.component.html',
  styleUrls: ['./country-wise-supplier-pie.component.scss']
})
export class CountryWiseSupplierPieComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  chartData: any[] = [];
  series: any;
  chart: any;
  legend: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    // const SubID: any = localStorage.getItem("subID");
    // this.SUBID = JSON.parse(SubID);

    // this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId == undefined ? this.SUBID : this.SubsidiaryId[0].subsidiaryId;
    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    // subscribe to changes to the selected subsidiary id of reminders
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: number) => {
      this.selectedSubsidiaryId = id;
      this.GetChartData();
    });

    this.GetChartData();
  }

  // initAPIPie() {
  //   this.httpService.GetById(`/procure-ws/pr/get-pr-to-rfq-and-pr-to-po-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
  //     .subscribe(res => {

  //       /* Chart code */
  //       // Create root element
  //       // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  //       let root = am5.Root.new("chartdivPie");


  //       // Set themes
  //       // https://www.amcharts.com/docs/v5/concepts/themes/
  //       root.setThemes([
  //         am5themes_Animated.new(root)
  //       ]);


  //       // Create chart
  //       // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  //       let chart = root.container.children.push(am5percent.PieChart.new(root, {
  //         layout: root.verticalLayout
  //       }));


  //       // Create series
  //       // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  //       let series = chart.series.push(
  //         am5percent.PieSeries.new(root, {
  //           valueField: "value",
  //           categoryField: "category",
  //           endAngle: 270,
  //         })
  //       );

  //       series.labels.template.setAll({
  //         fontSize: 9,
  //         maxWidth: 60,
  //         // text: "{category}: {value}",
  //         text: "{value}",
  //         oversizedBehavior: "wrap" // to truncate labels, use "truncate"
  //       });

  //       series.states.create("hidden", {
  //         endAngle: -90
  //       });


  //       // Set data
  //       // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  //       series.data.setAll(res);

  //       // Create legend
  //       let legend = chart.children.push(am5.Legend.new(root, {
  //         x: am5.percent(50),
  //         centerX: am5.percent(50),
  //         layout: am5.GridLayout.new(root, {
  //           maxColumns: 3,
  //           fixedWidthGrid: true
  //         })
  //       }));

  //       legend.labels.template.setAll({
  //         fontSize: 10,
  //         fontWeight: "100",
  //       });

  //       legend.valueLabels.template.setAll({
  //         fontSize: 10,
  //         fontWeight: "100",
  //       });
  //       legend.data.setAll(series.dataItems);

  //     });

  // }

  // Run the function only in the browser

  GetChartData() {
    this.httpService.GetById(`/procure-ws/pr/get-pr-to-rfq-and-pr-to-po-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        // this.chartData = res;
        this.chartData = [
          {
              "category": "Chaina",
              "value": 14
          },
          {
              "category": "Bhutan",
              "value": 22
          },
          {
            "category": "Bangladesh",
            "value": 56
        }
      ]
        // console.log(this.chartData);

        // Update Chart
        this.series.data.setAll(this.chartData);

        this.legend.data.setAll(this.series.dataItems);
      });
  }

  getChart() {
    /* Chart code */
    // Create root element
    let root = am5.Root.new("chartdivPieCountryWiseSupplier");


    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    this.chart = root.container.children.push(am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    }));


    // Create series
    this.series = this.chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    this.series.labels.template.setAll({
      fontSize: 9,
      maxWidth: 60,
      // text: "{category}: {value}",
      text: "{value}",
      oversizedBehavior: "wrap" // to truncate labels, use "truncate"
    });

    this.series.states.create("hidden", {
      endAngle: -90
    });

    // Create legend
    this.legend = this.chart.children.push(am5.Legend.new(root, {
      x: am5.percent(50),
      centerX: am5.percent(50),
      layout: am5.GridLayout.new(root, {
        maxColumns: 3,
        fixedWidthGrid: true
      })
    }));

    this.legend.labels.template.setAll({
      fontSize: 10,
      fontWeight: "100",
    });

    this.legend.valueLabels.template.setAll({
      fontSize: 10,
      fontWeight: "100",
    });

    // Update Chart
    this.series.data.setAll(this.chartData);

    this.legend.data.setAll(this.series.dataItems);
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.getChart();
    })
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivCountryWiseSupplier');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
