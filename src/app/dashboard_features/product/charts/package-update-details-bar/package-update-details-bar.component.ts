import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Material from '@amcharts/amcharts5/themes/Material';
import am5themes_Spirited from '@amcharts/amcharts5/themes/Spirited';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { TaxRateRuleAddEditComponent } from 'src/app/features/tax-rate-rule/tax-rate-rule-add-edit/tax-rate-rule-add-edit.component';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-package-update-details-bar',
  templateUrl: './package-update-details-bar.component.html',
  styleUrls: ['./package-update-details-bar.component.scss']
})
export class PackageUpdateDetailsBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  chartData: any;
  series: any;
  chart: any;
  legend: any;
  xAxis: any;
  fromDate: any;
  toDate: any;

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
    this.httpService.GetById(`/setup-ws/company-data/package-details`, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;

        let root = am5.Root.new("chartbarSortPackageUpdateDetails");
        // root.interfaceColors.set("grid", am5.color("#A23EF3"));

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          // wheelX: "panX",
          // wheelY: "zoomX",
          layout: root.verticalLayout
        }));

        // Data
        let colors = this.chart.get("colors");
        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "category",
          renderer: xRenderer,
          bullet: function (root: am5.Root, axis: any, dataItem: any) {
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
        // Enable label wrapping
        xRenderer.labels.template.setAll({
          fontSize: 10,
          oversizedBehavior: "wrap",
          textAlign: "center"
        });

        // Set up automatic width calculation using an adapter
        xRenderer.labels.template.adapters.add("width", (width, target) => {
          let x0 = this.xAxis.getDataItemCoordinateY(this.xAxis.dataItems[0], "category", 0);
          let x1 = this.xAxis.getDataItemCoordinateY(this.xAxis.dataItems[0], "category", 1);
          target.set("maxWidth", x1 - x0)
          return x1 - x0;
        });

        xRenderer.grid.template.setAll({
          location: 1
        })

        xRenderer.labels.template.setAll({
          paddingTop: 20
        });

        this.xAxis.data.setAll(this.chartData);

        let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1

          })
        }));


        // Add series
        this.series = this.chart.series.push(am5xy.ColumnSeries.new(root, {
          name: "categoryX",
          xAxis: this.xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
        }));

        this.series.columns.template.setAll({
          //for Shadow
          strokeOpacity: 0,
          shadowColor: am5.color(0x000000),
          shadowBlur: 8,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          //end for Shadow
          // tooltipText: "{categoryX}: {valueY}",
          tooltipText: "{valueY}",
          tooltipY: 0,
          templateField: "columnSettings",
          maxWidth: 120,
        });

        root.interfaceColors.set("grid", am5.color(0xff0000));


        this.series.columns.template.set("fillGradient", am5.LinearGradient.new(root, {
          stops: [{
            opacity: 1
          }, {
            opacity: 0.9
          }]
        }));

        this.series.data.setAll(res);

        // Set Color
        // this.series.columns.template.adapters.add("fill", (fill: any, target: any) => {
        //   return this.chart.get("colors")?.getIndex(this.series.columns.indexOf(target))
        // });

        // this.series.columns.template.adapters.add("stroke", (stroke: any, target: any) => {
        //   return this.chart.get("colors")?.getIndex(this.series.columns.indexOf(target));
        // });

        // Set Color
        this.series.columns.template.adapters.add("fill", (fill: any, target: any) => {
          const columnIndex = this.series.columns.indexOf(target);
          if (columnIndex === 0) {
            return am5.color("#BF00FF");
          } else if (columnIndex === 1) {
            return am5.color("#39FF14");
          } else if (columnIndex === 2) {
            return am5.color("#FF69B4");
          } else if (columnIndex === 3) {
            return am5.color("#00FFFF");
          } else if (columnIndex === 4) {
            return am5.color("#FFFF00");
          } else if (columnIndex === 5) {
            return am5.color("#FF0000");
          } else if (columnIndex === 6) {
            return am5.color("#FF6600");
          } else if (columnIndex === 7) {
            return am5.color("#00FFEE");
          } else if (columnIndex === 8) {
            return am5.color("#FF3E96");
          } else if (columnIndex === 9) {
            return am5.color("#00FF00");
          } else {
            // Return colors based on the default index
            return this.chart.get("colors")?.getIndex(columnIndex);
          }
        });

        this.series.columns.template.adapters.add("stroke", (stroke: any, target: any) => {
          const columnIndex = this.series.columns.indexOf(target);
          if (columnIndex === 0) {
            return am5.color("#BF00FF");
          } else if (columnIndex === 1) {
            return am5.color("#39FF14");
          } else if (columnIndex === 2) {
            return am5.color("#FF69B4");
          } else if (columnIndex === 3) {
            return am5.color("#00FFFF");
          } else if (columnIndex === 4) {
            return am5.color("#FFFF00");
          } else if (columnIndex === 5) {
            return am5.color("#FF0000");
          } else if (columnIndex === 6) {
            return am5.color("#FF6600");
          } else if (columnIndex === 7) {
            return am5.color("#00FFEE");
          } else if (columnIndex === 8) {
            return am5.color("#FF3E96");
          } else if (columnIndex === 9) {
            return am5.color("#00FF00");
          } else {
            // Return colors based on the default index
            return this.chart.get("colors")?.getIndex(columnIndex);
          }
        });


        // Make stuff animate on load
        this.series.appear();
        this.chart.appear(1000, 100);

        // Create legend
        this.legend = this.chart.children.push(am5.Legend.new(root, {
          nameField: "categoryX",
          centerX: am5.percent(50),
          x: am5.percent(50)
        }));

        this.legend.labels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        this.legend.valueLabels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        this.legend.data.setAll(this.series.dataItems);
      });
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivPackageUpdateDetails');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
