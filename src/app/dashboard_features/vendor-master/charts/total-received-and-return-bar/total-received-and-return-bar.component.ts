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
  selector: 'app-total-received-and-return-bar',
  templateUrl: './total-received-and-return-bar.component.html',
  styleUrls: ['./total-received-and-return-bar.component.scss']
})
export class TotalReceivedAndReturnBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  date: Date;

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
        let root = am5.Root.new("TotalReceiveAndReturn");


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


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          })
        );

        let data = [{
          "year": "Supplier - 1",
          "Total Received": 34,
          "Return": 22,
        }, {
          "year": "Supplier - 2",
          "Total Received": 56,
          "Return": 50,
        }, {
          "year": "Supplier - 3",
          "Total Received": 66,
          "Return": 25,
        }, {
          "year": "Supplier - 4",
          "Total Received": 86,
          "Return": 16,
        }]


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
          location: 1
        })

        xAxis.data.setAll(data);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
          })
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name: string, fieldName: string) {
          let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year"
          }));

          series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueY}",
            width: am5.percent(90),
            tooltipY: 0,
            strokeOpacity: 0
          });

          series.data.setAll(data);

          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();

          series.bullets.push(function () {
            return am5.Bullet.new(root, {
              locationY: 0,
              sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: 0,
                centerX: am5.p50,
                populateText: true
              })
            });
          });

          legend.data.push(series);
        }

        makeSeries("Total Received", "Total Received");
        makeSeries("Return", "Return");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivProjectWiseTotalReceiveAndReturn');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
