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

@Component({
  selector: 'app-total-approved-vs-total-paid-bills-kpi',
  templateUrl: './total-approved-vs-total-paid-bills-kpi.component.html',
  styleUrls: ['./total-approved-vs-total-paid-bills-kpi.component.scss']
})
export class TotalApprovedVsTotalPaidBillsKpiComponent implements OnInit {

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
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    const SubID: any = localStorage.getItem("subID");
    this.SUBID = JSON.parse(SubID);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId == undefined ? this.SUBID : this.SubsidiaryId[0].subsidiaryId;

    this.initKPI();
  }


  initKPI() {
    this.httpService.GetById(`/finance-ws/invoice/get-paid-and-total-approved-bills-count-for-invoice?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.min = res[0].value;
        this.max = res[1].value;

        let root = am5.Root.new("totalPrKpiAP");


        // Set themes
        root.setThemes([
          am5themes_Animated.new(root)
        ]);


        // Create chart
        let chart = root.container.children.push(am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          startAngle: 160,
          endAngle: 380
        }));


        // Create axis and its renderer
        let axisRenderer = am5radar.AxisRendererCircular.new(root, {
          innerRadius: -30
        });

        axisRenderer.grid.template.setAll({
          stroke: root.interfaceColors.get("background"),
          visible: true,
          strokeOpacity: 0.0
        });

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          max: this.max,
          strictMinMax: true,
          renderer: axisRenderer
        }));


        // Add clock hand
        let axisDataItem2: any = xAxis.makeDataItem({});

        let clockHand = am5radar.ClockHand.new(root, {
          pinRadius: am5.percent(10),
          radius: am5.percent(130),
          bottomWidth: 15
        })

        let bullet = axisDataItem2.set("bullet", am5xy.AxisBullet.new(root, {
          sprite: clockHand
        }));

        xAxis.createAxisRange(axisDataItem2);

        let label = chart.radarContainer.children.push(am5.Label.new(root, {
          fill: am5.color(0x030303),
          centerX: am5.percent(50),
          centerY: am5.percent(0),
          textAlign: "center",
          // centerY: am5.percent(50),
          fontSize: "1.1em"
        }));

        let Total_label = chart.radarContainer.children.push(am5.Label.new(root, {
          fill: am5.color(0x030303),
          centerX: am5.percent(50),
          centerY: am5.percent(-60),
          textAlign: "right",
          fontSize: "1em"
        }));

        clockHand.pin.setAll({
          fillOpacity: 0,
          strokeOpacity: 0.0,
          stroke: am5.color(0x030303),
          // strokeWidth: 1,
          // strokeDasharray: [2, 2]
        });

        axisDataItem2.set("value", this.min);
        axisDataItem2.set("Total_value", this.max);

        bullet.get("sprite").on("rotation", function () {
          let value = axisDataItem2.get("value");
          let Total_value = axisDataItem2.get("Total_value");
          let text = Math.round(axisDataItem2.get("value")).toString();
          let fill = am5.color(0x000000);
          xAxis.axisRanges.each(function (axisRange: any) {
            if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
              fill = axisRange.get("axisFill").get("fill");
            }
          })

          label.set("text", Math.round(value).toString());
          Total_label.set("text", Math.round(Total_value).toString());

          label.set("text", `Paid Bill : ${Math.round(value).toString()}`);
          Total_label.set("text", `Total Approved Bill : ${Math.round(Total_value).toString()}`);

          // clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
          clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        });

        let bandsData = [{
          title: "PAID",
          color: "#54b947",
          lowScore: 0,
          highScore: this.min
        },
        {
          title: "TOTAL",
          color: "#C70039",
          lowScore: this.min,
          highScore: this.max
        }];

        am5.array.each(bandsData, function (data: any) {
          let axisRange: any = xAxis.createAxisRange(xAxis.makeDataItem({}));

          axisRange.setAll({
            value: data.lowScore,
            endValue: data.highScore
          });

          axisRange.get("axisFill").setAll({
            visible: true,
            fill: am5.color(data.color),
            fillOpacity: 0.8
          });

          /////----------------Value  Sets-----------------/////////////////////////
          axisRange.get("label").setAll({
            text: data.title,
            inside: true,
            radius: 15,
            fontSize: "1em",
            fill: root.interfaceColors.get("background")
          });
        });


        // Make stuff animate on load
        chart.appear(1000, 150);

      });



  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalAP');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
