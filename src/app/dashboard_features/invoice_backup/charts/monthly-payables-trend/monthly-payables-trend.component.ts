import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-monthly-payables-trend',
  templateUrl: './monthly-payables-trend.component.html',
  styleUrls: ['./monthly-payables-trend.component.scss']
})
export class MonthlyPayablesTrendComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("AllRoleList");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.initbarSort();
  }

  initbarSort() {
    let root = am5.Root.new("chartbarSort");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));


    // Data
    let colors = chart.get("colors");

    this.httpService
      .GetById(`/masters-ws/supplier/get-supplier-dashboard-by-approval-status?SubsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe((res) => {
        console.log(res)

        // let data = [{
        //   country: "Mar 22",
        //   visits: 725,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Apr 22",
        //   visits: 625,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "May 22",
        //   visits: 602,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Jun 22",
        //   visits: 509,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Jul 22",
        //   visits: 322,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Aug 22",
        //   visits: 214,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Sep 22",
        //   visits: 204,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Oct 22",
        //   visits: 198,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Nov 22",
        //   visits: 165,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Dec 22",
        //   visits: 93,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Jan 23",
        //   visits: 41,
        //   columnSettings: { fill: colors?.next() }
        // }, {
        //   country: "Feb 23",
        //   visits: 41,
        //   columnSettings: { fill: colors?.next() }
        // }
        // ];

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "category",
          renderer: xRenderer,
          bullet: function (root, axis, dataItem) {
            return am5xy.AxisBullet.new(root, {
              location: 0.5,
              sprite: am5.Picture.new(root, {
                width: 24,
                height: 18,
                centerY: am5.p50,
                centerX: am5.p50,
              })
            });
          }
        }));

        xRenderer.grid.template.setAll({
          location: 1
        })

        xRenderer.labels.template.setAll({
          paddingTop: 20
        });

        xAxis.data.setAll(res);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
          })
        }));


        // Add series
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category"
        }));

        series.columns.template.setAll({
          tooltipText: "{categoryX}: {valueY}",
          tooltipY: 0,
          strokeOpacity: 0,
          templateField: "columnSettings"
        });

        series.data.setAll(res);


        // Make stuff animate on load
        series.appear();
        chart.appear(1000, 100);
      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivMonthlyPayablesTrend');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
