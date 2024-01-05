import { Component, OnInit, Inject, PLATFORM_ID, NgZone, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-cfo-total-over-dues-bill-pie',
  templateUrl: './cfo-total-over-dues-bill-pie.component.html',
  styleUrls: ['./cfo-total-over-dues-bill-pie.component.scss']
})
export class CfoTotalOverDuesBillPieComponent implements OnInit {

  isFullscreen: any = false;
  min: any;
  processed: any;
  total: any;
  percent: any;
  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  style: any;
  max: any;
  SUBID: any;
  chartData: any;
  xAxis: any;
  axisDataItem: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("AllRoleList");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    const SubID: any = localStorage.getItem("subID");
    this.SUBID = JSON.parse(SubID);

    // Get Subsidiary Id for CFO Dashboard from LocalStorage
    const GetCfoSubsidiaryId: any = localStorage.getItem("CFOSelectedSubId");
    this.selectedSubsidiaryId = JSON.parse(GetCfoSubsidiaryId);

    // subscribe to changes to the selected subsidiary id of indicators
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: any) => {
      this.selectedSubsidiaryId = id;
      this.initKPI();
    });

    this.initKPI();
  }


  initKPI() {
    this.httpService.GetById(`/finance-ws/invoice/total-dues-bill-amount?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {

        let root = am5.Root.new("TotalOverdueBills");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        let chart = root.container.children.push(am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(
          am5percent.PieSeries.new(root, {
            valueField: "amount",
            categoryField: "category",
            endAngle: 270,
          })
        );

        series.labels.template.setAll({
          fontSize: 9,
          maxWidth: 60,
          // text: "{category}: {value}",
          text: "{value}",
          oversizedBehavior: "wrap" // to truncate labels, use "truncate"
        });

        series.states.create("hidden", {
          endAngle: -90
        });

        ///   Pie Color Set   ///
        series.get("colors")?.set("colors", [
          am5.color("#39FF14"),
          am5.color("#FF0040"),
        ]);

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(res);

        // Create legend
        let legend = chart.children.push(am5.Legend.new(root, {
          x: am5.percent(50),
          centerX: am5.percent(50),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true
          })
        }));

        legend.labels.template.setAll({
          fontSize: 10,
          fontWeight: "100",
        });

        legend.valueLabels.template.setAll({
          fontSize: 10,
          fontWeight: "100",
        });
        legend.data.setAll(series.dataItems);

      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalOverdueBills');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
