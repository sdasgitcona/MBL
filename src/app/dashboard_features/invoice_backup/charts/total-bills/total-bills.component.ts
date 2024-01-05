import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-total-bills',
  templateUrl: './total-bills.component.html',
  styleUrls: ['./total-bills.component.scss']
})
export class TotalBillsComponent implements OnInit {

  isFullscreen: any = false;

  constructor() { }

  ngOnInit(): void {
    this.initAPIGuage();
  }

  initAPIGuage() {
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360
      })
    );

    // Create axis and its renderer
    let axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -10,
      // stroke: root.interfaceColors.get("background"),
      // visible: true,
      strokeOpacity: 0.0,
      strokeWidth: 15,
      strokeGradient: am5.LinearGradient.new(root, {
        rotation: 0,
        // stops: [
        //   { color: am5.color(0x19d228) },
        //   { color: am5.color(0xf4fb16) },
        //   { color: am5.color(0xf6d32b) },
        //   { color: am5.color(0xfb7116) }
        // ]
      })
    });

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer
      })
    );

    // Add clock hand
    let axisDataItem: any = xAxis.makeDataItem({});
    axisDataItem.set("value", 0);

    let clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(18),
      radius: am5.percent(115),
      bottomWidth: 12
    })

    // let bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
    //   sprite: am5radar.ClockHand.new(root, {
    //     radius: am5.percent(99)
    //   })
    // }));

    let bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));


    xAxis.createAxisRange(axisDataItem);

    let fill1: any

    let label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0x030303),
      centerX: am5.percent(50),
      textAlign: "center",
      // centerY: am5.percent(50),
      fontSize: "1.5em"
    }));

    clockHand.pin.setAll({
      fillOpacity: 0,
      strokeOpacity: 0.0,
      stroke: am5.color(0x000000),
      // strokeWidth: 1,
      // strokeDasharray: [2, 2]
    });

    axisDataItem.set("value", 50);
    bullet.get("sprite").on("rotation", function () {
      let value = axisDataItem.get("value");
      let text = Math.round(axisDataItem.get("value")).toString();
      let fill = am5.color(0xffffff);
      xAxis.axisRanges.each(function (axisRange: any) {
        if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
          fill = axisRange.get("axisFill").get("fill");
        }
      })


      label.set("text", Math.round(value).toString());

      // clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
    });

    setInterval(function () {
      axisDataItem.animate({
        key: "value",
        to: Math.round(Math.random() * 100),
        duration: 800,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }, 2000)

    chart.bulletsContainer.set("mask", undefined);

    // xAxis.createAxisRange(axisDataItem);

    // axisDataItem.get("grid").set("visible", false);

    // setInterval(() => {
    //   axisDataItem.animate({
    //     key: "value",
    //     to: Math.round(Math.random() * 100),
    //     duration: 800,
    //     easing: am5.ease.out(am5.ease.cubic)
    //   });
    // }, 2000);


    let bandsData = [{
      // title: "Unsustainable",
      color: "#66ff33",
      lowScore: -40,
      highScore: -20
    }, {
      // title: "Volatile",
      color: "#f04922",
      lowScore: -20,
      highScore: 0
    }, {
      // title: "Foundational",
      color: "#fdae19",
      lowScore: 0,
      highScore: 20
    }, {
      // title: "Developing",
      color: "#f3eb0c",
      lowScore: 20,
      highScore: 40
    }, {
      // title: "Maturing",
      color: "#b0d136",
      lowScore: 40,
      highScore: 60
    }, {
      // title: "Sustainable",
      color: "#54b947",
      lowScore: 60,
      highScore: 80
    }, {
      // title: "High Performing",
      color: "#C70039",
      lowScore: 80,
      highScore: 100
    }];

    am5.array.each(bandsData, function (data) {
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

      axisRange.get("label").setAll({
        // text: data.title,
        inside: true,
        // radius: 15,
        // fontSize: "0.9em",
        // fill: root.interfaceColors.get("background")
      });
    });

    // Make stuff animate on load
    chart.appear(1000, 100);
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalBills');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
