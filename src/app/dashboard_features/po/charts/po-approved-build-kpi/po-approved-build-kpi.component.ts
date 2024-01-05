import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-po-approved-build-kpi',
  templateUrl: './po-approved-build-kpi.component.html',
  styleUrls: ['./po-approved-build-kpi.component.scss']
})
export class PoApprovedBuildKPIComponent implements OnInit {


  isFullscreen: any = false;
  min: any;
  processed: any;
  total: any;
  leftPR: any;
  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  style:any;
  max: any;

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.httpService.GetById(`/procure-ws/po/get-billed-approved-po?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
    .subscribe(res => {
      this.min = res[0].value;
      this.max = res[1].value;
      this.leftPR = this.max - this.min;
      console.log(this.min)
      this.initKPI();
    });
  }


  initKPI() {

    let root = am5.Root.new("ApprovedBuildPOKpi");


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

      label.set("text", `Billed PO : ${Math.round(value).toString()}`);
      Total_label.set("text", `Approved PO : ${Math.round(Total_value).toString()}`);

      // clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });

    let bandsData = [{
      title: "Billed PO",
      color: "#54b947",
      lowScore: 0,
      highScore: this.min
    },
    {
      title: "Approved PO",
      color: "#C70039",
      lowScore: this.min,
      highScore: this.max
    }];

    am5.array.each(bandsData, function (data:any) {
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


  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivApprovedBuildPO');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }


}
