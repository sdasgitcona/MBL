import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { TaxRateRuleAddEditComponent } from 'src/app/features/tax-rate-rule/tax-rate-rule-add-edit/tax-rate-rule-add-edit.component';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';

@Component({
  selector: 'app-ap-invoice-aging-summary-bar',
  templateUrl: './ap-invoice-aging-summary-bar.component.html',
  styleUrls: ['./ap-invoice-aging-summary-bar.component.scss']
})
export class ApInvoiceAgingSummaryBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  chartData: any;
  series: any;
  legend: any;
  // data: any[] = [];
  chart!: am5xy.XYChart;

  private root!: am5.Root;

  constructor(
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService,
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    const SubID: any = localStorage.getItem("subID");
    this.SUBID = JSON.parse(SubID);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId == undefined ? this.SUBID : this.SubsidiaryId[0].subsidiaryId;

    // this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    // subscribe to changes to the selected subsidiary id of reminders
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: number) => {
      this.selectedSubsidiaryId = id;
      this.GetChartData();
    });

    this.GetChartData();
  }

  GetChartData() {
    this.httpService.GetById(`/finance-ws/invoice/get-approval-aging-invoice?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;
        // console.log(this.chartData);
        this.getChart();

        // Update Chart
        this.series.data.setAll(this.chartData);

        this.legend.data.setAll(this.series.dataItems);
      });
  }

  getChart() {
    this.httpService.GetById(`/finance-ws/invoice/get-approval-aging-invoice?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        // this.chartData = res;

        let root = am5.Root.new("chartbarSortDaywiseAP");

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

        xAxis.data.setAll(this.chartData);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1

          })
        }));


        // Add series
        this.series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: "categoryX",
          xAxis: xAxis,
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
          tooltipText: "{categoryX}: {valueY}",
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

        // series.data.setAll(this.chartData);

        // Set Color
        this.series.columns.template.adapters.add("fill", (fill: any, target: any) => {
          const columnIndex = this.series.columns.indexOf(target);
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

        this.series.columns.template.adapters.add("stroke", (stroke: any, target: any) => {
          const columnIndex = this.series.columns.indexOf(target);
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

        // // Make stuff animate on load
        this.series.appear();
        chart.appear(1000, 100);

        // Create legend
        this.legend = chart.children.push(am5.Legend.new(root, {
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

        // Update Chart
        this.series.data.setAll(this.chartData);

        this.legend.data.setAll(this.series.dataItems);

      });
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivMonthlyDayWiseAP');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
