import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { TaxRateRuleAddEditComponent } from 'src/app/features/tax-rate-rule/tax-rate-rule-add-edit/tax-rate-rule-add-edit.component';

am5.addLicense("AM5C367311118");


@Component({
  selector: 'app-po-approval-aging',
  templateUrl: './po-approval-aging.component.html',
  styleUrls: ['./po-approval-aging.component.scss']
})
export class PoApprovalAgingComponent implements OnInit {


  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.initbarSort();
  }


  initbarSort() {

    this.httpService.GetById(`/procure-ws/po/get-pending-po-count-day-wise?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        let root = am5.Root.new("chartbarPOApprovalAging");

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
          // wheelX: "panX",
          // wheelY: "zoomX",
          layout: root.verticalLayout
        }));

        // Data
        let colors = chart.get("colors");
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
        // Enable label wrapping
        xRenderer.labels.template.setAll({
          fontSize: 10,
          oversizedBehavior: "wrap",
          textAlign: "left"
        });

        // Set up automatic width calculation using an adapter
        xRenderer.labels.template.adapters.add("width", function (width, target) {
          let x0 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 0);
          let x1 = xAxis.getDataItemCoordinateY(xAxis.dataItems[0], "category", 1);
          target.set("maxWidth", x1 - x0)
          return x1 - x0;
        });

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
          name: "categoryX",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
        }));

        series.columns.template.setAll({
          //for Shadow
          strokeOpacity: 0,
          shadowColor: am5.color(0x000000),
          shadowBlur: 8,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          //end for Shadow
          tooltipText: "{categoryX}: {valueY}",
          tooltipY: 0,
          templateField: "columnSettings",
          maxWidth: 120,
        });

        root.interfaceColors.set("grid", am5.color(0xff0000));
        

        series.columns.template.set("fillGradient", am5.LinearGradient.new(root, {
          stops: [{
            opacity: 1
          }, {
            opacity: 0.9
          }]
        }));

        series.data.setAll(res);

        // Set Color
        series.columns.template.adapters.add("fill", (fill: any, target: any) => {
          const columnIndex = series.columns.indexOf(target);
          if (columnIndex === 0) {
            return am5.color("#99FF33");
          } else if (columnIndex === 1) {
            return am5.color("#FFFF33");
          } else if (columnIndex === 2) {
            return am5.color("#FF8000");
          } else if (columnIndex === 3) {
            return am5.color("#FF0000");
          } else {
            // Return colors based on the default index
            return chart.get("colors")?.getIndex(columnIndex);
          }
        });

        series.columns.template.adapters.add("stroke", (stroke: any, target: any) => {
          const columnIndex = series.columns.indexOf(target);
          if (columnIndex === 0) {
            return am5.color("#99FF33");
          } else if (columnIndex === 1) {
            return am5.color("#FFFF33");
          } else if (columnIndex === 2) {
            return am5.color("#FF8000");
          } else if (columnIndex === 3) {
            return am5.color("#FF0000");
          } else {
            // Return colors based on the default index
            return chart.get("colors")?.getIndex(columnIndex);
          }
        });

        // Make stuff animate on load
        series.appear();
        chart.appear(1000, 100);

        // Create legend
        let legend = chart.children.push(am5.Legend.new(root, {
          nameField: "categoryX",
          centerX: am5.percent(50),
          x: am5.percent(50)
        }));

        legend.labels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        legend.valueLabels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        legend.data.setAll(series.dataItems);

      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivPOApprovalAging');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
