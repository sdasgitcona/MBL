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
  selector: 'app-active-inactive-registration-bar',
  templateUrl: './active-inactive-registration-bar.component.html',
  styleUrls: ['./active-inactive-registration-bar.component.scss']
})
export class ActiveInactiveRegistrationBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  xAxis: any;
  chartData: any;
  series: any;
  chart: any;
  year: any = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028]
  selectedYear: any = this.year[3];

  constructor(
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("AllRoleList");
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

    this.httpService.GetById(`/setup-ws/company-data/registration/active-inactive?year=` + this.selectedYear, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;
        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("ActiveInactiveRegistration");


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

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set("scrollbarX", am5.Scrollbar.new(root, {
        //   orientation: "horizontal"
        // }));

        // let data: any = [
        //   {
        //     "Bank": "SERVICE",
        //     "Active": 334,
        //     "Inactive": 52,
        //   },
        //   {
        //     "Bank": "GOODS",
        //     "Active": 134,
        //     "Inactive": 44,
        //   },
        //   {
        //     "Bank": "BOTH",
        //     "Active": 234,
        //     "Inactive": 68,
        //   },
        // ]

        // // Merge objects with the same bank name
        // let mergedData: any = {};
        // data.forEach((item: any) => {
        //   if (!mergedData[item.Bank]) {
        //     mergedData[item.Bank] = { Bank: item.Bank, ...item };
        //   } else {
        //     for (const prop in item) {
        //       if (prop !== "Bank") {
        //         mergedData[item.Bank][prop] = mergedData[item.Bank][prop] ? mergedData[item.Bank][prop] + item[prop] : item[prop];
        //       }
        //     }
        //   }
        // });

        // // Convert merged data back to an array
        // let mergedArray = Object.values(mergedData);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {});
        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "name",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
          location: 1
        })

        // Enable label wrapping
        xRenderer.labels.template.setAll({
          fontSize: 10,
          oversizedBehavior: "wrap",
          textAlign: "center"
        });

        this.xAxis.data.setAll(this.chartData);

        let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
          })
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = this.chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const makeSeries = (name: any, fieldName: any) => {
          this.series = this.chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: this.xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "name"
          }));

          this.series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}: {valueY}",
            tooltipY: am5.percent(10)
          });
          this.series.data.setAll(this.chartData);

          root.interfaceColors.set("grid", am5.color(0xff0000));

          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          this.series.appear();

          this.series.bullets.push(function () {
            return am5.Bullet.new(root, {
              sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true
              })
            });
          });

          legend.labels.template.setAll({
            fontSize: 10,
            fontWeight: "100"
          });
  
          legend.valueLabels.template.setAll({
            fontSize: 10,
            fontWeight: "100"
          });

          legend.data.push(this.series);
        }

        // Set Color
        this.chart.get("colors").set("colors", [
          am5.color("#39FF14"),
          am5.color("#FF0040"),
        ]);

        makeSeries("Active", "active");
        makeSeries("Inactive", "inActive");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.chart.appear(1000, 100);
      });

  };

  updateChart() {
    this.httpService.GetById(`/setup-ws/company-data/registration/active-inactive?year=` + this.selectedYear, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;
        this.initbarSort();

        this.xAxis.data.setAll(this.chartData);
        this.series.data.setAll(this.chartData);
        this.chart.appear(1000, 100);

      });
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivActiveInactiveRegistration');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
