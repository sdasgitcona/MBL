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
  selector: 'app-delivery-performance-bar',
  templateUrl: './delivery-performance-bar.component.html',
  styleUrls: ['./delivery-performance-bar.component.scss']
})
export class DeliveryPerformanceBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;

  constructor(
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
      this.initbarSort();
    });

    this.initbarSort();
  }


  initbarSort() {

    this.httpService.GetById(`/procure-ws/pr/get-pr-count-for-project-name-total?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        /* Chart code */

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("DeliveryPerformance");


        let myTheme = am5.Theme.new(root);

        myTheme.rule("Grid", ["base"]).setAll({
          strokeOpacity: 0.1
        });


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          // wheelX: "panY",
          // wheelY: "zoomY",
          layout: root.verticalLayout
        }));

        // // Add scrollbar
        // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set("scrollbarY", am5.Scrollbar.new(root, {
        //   orientation: "vertical"
        // }));

        let data = [{
          "year": "Supplier - 1",
          "Before Time": 34,
          "On Time": 22,
          "Delay": 6,
        }, {
          "year": "Supplier - 2",
          "Before Time": 56,
          "On Time": 50,
          "Delay": 22,
        }, {
          "year": "Supplier - 3",
          "Before Time": 66,
          "On Time": 25,
          "Delay": 26,
        }, {
          "year": "Supplier - 4",
          "Before Time": 86,
          "On Time": 16,
          "Delay": 4,
        }]


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let yRenderer = am5xy.AxisRendererY.new(root, {});
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        yRenderer.grid.template.setAll({
          location: 1
        })

        yAxis.data.setAll(data);

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1
          })
        }));

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name: string, fieldName: string) {
          let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: "year"
          }));

          series.columns.template.setAll({
            tooltipText: "{name}, {categoryY}: {valueX}",
            tooltipY: am5.percent(90)
          });
          series.data.setAll(data);

          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();

          series.bullets.push(function () {
            return am5.Bullet.new(root, {
              sprite: am5.Label.new(root, {
                text: "{valueX}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true
              })
            });
          });

          legend.data.push(series);
        }

        makeSeries("Before Time", "Before Time");
        makeSeries("On Time", "On Time");
        makeSeries("Delay", "Delay");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivProjectWiseDeliveryPerformance');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
