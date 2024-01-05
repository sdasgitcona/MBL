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
  selector: 'app-item-wise-holding-value-pie',
  templateUrl: './item-wise-holding-value-pie.component.html',
  styleUrls: ['./item-wise-holding-value-pie.component.scss']
})
export class ItemWiseHoldingValuePieComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  chartData: any[] = [];
  series: any;
  chart: any;
  legend: any;
  fromDate: any;
  toDate: any;
  months: any = [
    { name: 'Monthly', code: '1' },
    { name: 'Quartely', code: '3' },
    { name: 'Halfyearly', code: '6' },
    { name: 'Yearly', code: '12' },
  ]
  selectedMonth: any = this.months[0].code;

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


    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.getCurrentDate();
    this.updateFromDate();
    this.initAPIPie();
  }

  initAPIPie() {
    this.httpService.GetById(`/procure-ws/grn/get-items-holding-value?subsidiaryId=` + this.selectedSubsidiaryId + `&fromDate=` + this.fromDate + `&toDate=` + this.toDate, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("chartdivPieItemWiseHoldingValue");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        this.chart = root.container.children.push(am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.series = this.chart.series.push(
          am5percent.PieSeries.new(root, {
            valueField: "amount",
            categoryField: "itemName",
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

        ///   Pie Color Set   ///
        this.series.get("colors")?.set("colors", [
          am5.color("#BF00FF"),
          am5.color("#FF69B4"),
          am5.color("#FF0000"),
          am5.color("#FF6600"),
          am5.color("#00FFEE"),
        ]);

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        this.series.data.setAll(this.chartData);


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
        this.legend.data.setAll(this.series.dataItems);

      });

  }

  updateChart() {
    this.getDate();
    this.updateFromDate();
    this.httpService.GetById(`/procure-ws/grn/get-items-holding-value?subsidiaryId=` + this.selectedSubsidiaryId + `&fromDate=` + this.fromDate + `&toDate=` + this.toDate, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;
        this.initAPIPie();

        // Update chartData
        this.series.data.setAll(this.chartData);
        this.legend.data.setAll(this.series.dataItems);
        this.series.appear(1000, 100);

      });

  };

  getDate() {
    const dateStr: any = this.fromDate;
    const ToDateStr: any = this.toDate;
    const date = new Date(dateStr);
    const ToDate = new Date(ToDateStr);

    const year = date.getFullYear(); // Get the year (e.g., 2023)
    const ToDateyear = ToDate.getFullYear(); // Get the year (e.g., 2023)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (e.g., 05)
    const ToDatemonth = (ToDate.getMonth() + 1).toString().padStart(2, "0"); // Get the month (e.g., 05)
    const day = date.getDate().toString().padStart(2, "0"); // Get the day (e.g., 15)
    const ToDateday = ToDate.getDate().toString().padStart(2, "0"); // Get the day (e.g., 15)

    this.fromDate = `${year}-${month}-${day}`; // Combine the components into the desired format
    this.toDate = `${ToDateyear}-${ToDatemonth}-${ToDateday}`; // Combine the components into the desired format
  }

  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.toDate = `${year}-${month}-${day}`;
  }

  updateFromDate() {
    const toDateObj = new Date(this.toDate);
    toDateObj.setMonth(toDateObj.getMonth() - this.selectedMonth);
    const year = toDateObj.getFullYear();
    const month = String(toDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(toDateObj.getDate()).padStart(2, '0');
    this.fromDate = `${year}-${month}-${day}`;
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivItemWiseHoldingValue');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
