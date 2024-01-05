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
  selector: 'app-total-supplier-vs-approve-supplier-kpi',
  templateUrl: './total-supplier-vs-approve-supplier-kpi.component.html',
  styleUrls: ['./total-supplier-vs-approve-supplier-kpi.component.scss']
})
export class TotalSupplierVsApproveSupplierKpiComponent implements OnInit {

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

    // subscribe to changes to the selected subsidiary id of reminders
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: number) => {
      this.selectedSubsidiaryId = id;
      // this.GetChartData();
    });

    this.initKPI();
  }


  initKPI() {
    this.httpService.GetById(`/procure-ws/pr/get-processed-and-total-pr-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        // this.min = res[0].value;
        this.min = 25;
        // this.max = res[1].value;
        this.max = 60;

        let root = am5.Root.new("totalSupplierKpi");


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

          label.set("text", `Approve Supplier : ${Math.round(value).toString()}`);
          Total_label.set("text", `Total Supplier : ${Math.round(Total_value).toString()}`);

          // clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
          clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        });

        let bandsData = [{
          title: "Approve",
          color: "#54b947",
          lowScore: 0,
          highScore: this.min
        },
        {
          title: "Total",
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

  // GetChartData() {
  //   this.httpService.GetById(`/procure-ws/pr/get-processed-and-total-pr-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
  //     .subscribe(res => {
  //       this.chartData = res;
  //       // // console.log(this.chartData);
  //       this.min = res[0].value;
  //       this.max = res[1].value;
  //       this.percent = (this.min / this.max) * 100;
  //       // this.getChart();

  //       // Update Chart
  //       this.axisDataItem.set("value", this.percent);

  //       this.xAxis.createAxisRange(this.axisDataItem);


  //       // this.legend.data.setAll(this.series.dataItems);
  //     });
  // }

  // getChart() {
  //   this.httpService.GetById(`/procure-ws/pr/get-processed-and-total-pr-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
  //     .subscribe(res => {
  //       /* Chart code */
  //       // Create root element
  //       // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  //       let root = am5.Root.new("totalPrKpi");

  //       // Set themes
  //       // https://www.amcharts.com/docs/v5/concepts/themes/
  //       root.setThemes([
  //         am5themes_Animated.new(root)
  //       ]);

  //       // Create chart
  //       // https://www.amcharts.com/docs/v5/charts/radar-chart/
  //       let chart = root.container.children.push(
  //         am5radar.RadarChart.new(root, {
  //           panX: false,
  //           panY: false,
  //           startAngle: 180,
  //           endAngle: 360
  //         })
  //       );

  //       chart.getNumberFormatter().set("numberFormat", "#'%'");

  //       // Create axis and its renderer
  //       // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
  //       let axisRenderer = am5radar.AxisRendererCircular.new(root, {
  //         innerRadius: -10,
  //         strokeOpacity: 1,
  //         strokeWidth: 25,
  //         strokeGradient: am5.LinearGradient.new(root, {
  //           rotation: 0,
  //           // stops: [
  //           //   { color: am5.color(0x19d228) },
  //           //   // { color: am5.color(0xf4fb16) },
  //           //   // { color: am5.color(0xf6d32b) },
  //           //   { color: am5.color(0xfb7116) }
  //           // ]
  //           stops: [
  //             { color: am5.color(0x00ff00), offset: 0 }, // Green color at 0% position
  //             { color: am5.color(0x00ff00), offset: 0.5 }, // Green color at 50% position
  //             { color: am5.color(0xff0000), offset: 0.5 }, // Red color at 50% position
  //             { color: am5.color(0xff0000), offset: 1 } // Red color at 100% position
  //           ]
  //         })
  //       });

  //       this.xAxis = chart.xAxes.push(
  //         am5xy.ValueAxis.new(root, {
  //           maxDeviation: 0,
  //           min: 0,
  //           // max: this.max,
  //           max: 100,
  //           strictMinMax: true,
  //           renderer: axisRenderer
  //         })
  //       );

  //       // Adjust the distance between chart axis and labels
  //       axisRenderer.labels.template.set("paddingTop", 420); // Adjust the top padding as needed

  //       let clockHand = am5radar.ClockHand.new(root, {
  //         centerX: am5.percent(0),
  //         pinRadius: am5.percent(10),
  //         radius: am5.percent(90),
  //         bottomWidth: 12
  //       })

  //       // Add clock hand
  //       // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
  //       this.axisDataItem = this.xAxis.makeDataItem({});
  //       // axisDataItem.set("value", this.min);


  //       let bullet = this.axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  //         sprite: clockHand
  //       }));

  //       ///   clockhand pin background setting    
  //       clockHand.pin.setAll({
  //         fillOpacity: 0,
  //         strokeOpacity: 0.0,
  //         stroke: am5.color(0x000000),
  //         // strokeWidth: 1,
  //         // strokeDasharray: [2, 2]
  //       });

  //       let label = chart.radarContainer.children.push(am5.Label.new(root, {
  //         fill: am5.color("#17202A"),
  //         centerX: am5.percent(50),
  //         textAlign: "center",
  //         centerY: am5.percent(50),
  //         fontSize: "1.3em"
  //       }));

  //       let Total_label = chart.radarContainer.children.push(am5.Label.new(root, {
  //         fill: am5.color(0x030303),
  //         centerX: am5.percent(50),
  //         centerY: am5.percent(-10),
  //         textAlign: "right",
  //         fontSize: "1.3em"
  //       }));

  //       ///   Bullet/clockhand program    ///----
  //       bullet.get("sprite").on("rotation", () => {
  //         let value = this.axisDataItem.get("value");
  //         let text = Math.round(this.axisDataItem.get("value")).toString();
  //         let fill = am5.color(0x000000);
  //         this.xAxis.axisRanges.each(function (axisRange: any) {
  //           if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
  //             fill = axisRange.get("axisFill").get("fill");
  //           }
  //         })

  //         // label.set("text", Math.round(value).toString());

  //         // label.set("text", `${Math.round(value).toString()}%`);

  //         label.set("text", `Processed PR : ${Math.round(this.min).toString()}`);
  //         Total_label.set("text", `Total PR : ${Math.round(this.max).toString()}`);

  //       });

  //       // let label = chart.radarContainer.children.push(am5.Label.new(root, {
  //       //   fill: am5.color(0xffffff),
  //       //   centerX: am5.percent(50),
  //       //   textAlign: "center",
  //       //   centerY: am5.percent(50),
  //       //   fontSize: "0.5em"
  //       // }));

  //       // bullet.get("sprite").on("rotation", () => {
  //       //   let value = this.axisDataItem.get("value");
  //       //   let text = Math.round(this.axisDataItem.get("value")).toString();
  //       //   let fill = am5.color(0x000000);
  //       //   this.xAxis.axisRanges.each(function (axisRange: any) {
  //       //     if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
  //       //       fill = axisRange.get("axisFill").get("fill");
  //       //     }
  //       //   })

  //       //   // label.set("text", Math.round(value).toString());
  //       //   label.set("text", `${Math.round(value).toString()}%`);
  //       // });

  //       // xAxis.createAxisRange(axisDataItem);

  //       // axisDataItem.get("grid").set("visible", false);

  //       // setInterval(() => {
  //       //   axisDataItem.animate({
  //       //     key: "value",
  //       //     to: Math.round(Math.random() * 100),
  //       //     duration: 800,
  //       //     easing: am5.ease.out(am5.ease.cubic)
  //       //   });
  //       // }, 2000);

  //       // Make stuff animate on load
  //       chart.appear(1000, 100);
  //     });

  // }

  // browserOnly(f: () => void) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.zone.runOutsideAngular(() => {
  //       f();
  //     });
  //   }
  // }

  // ngAfterViewInit() {
  //   this.browserOnly(() => {
  //     this.getChart();
  //   })
  // }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalSupplierKPI');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
