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
  selector: 'app-category-wise-supplier-bar',
  templateUrl: './category-wise-supplier-bar.component.html',
  styleUrls: ['./category-wise-supplier-bar.component.scss']
})
export class CategoryWiseSupplierBarComponent implements OnInit {

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
        let root = am5.Root.new("CategoryWiseSupplier");


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

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set("scrollbarX", am5.Scrollbar.new(root, {
        //   orientation: "horizontal"
        // }));

        let data: any = [
          // {
          //   "Bank": "CITI",
          //   "SERVICE": 334,
          //   "EURO": 52,
          // },
          // {
          //   "Bank": "CITI",
          //   "USD": 134,
          // },
          // {
          //   "Bank": "SBI",
          //   "INR": 234,
          //   "EURO": 68,
          // },
          // {
          //   "Bank": "SBI",
          //   "USD": 74,
          // },
          {
            "Bank": "SERVICE",
            "Active": 334,
            "Inactive": 52,
          },
          {
            "Bank": "GOODS",
            "Active": 134,
            "Inactive": 44,
          },
          {
            "Bank": "BOTH",
            "Active": 234,
            "Inactive": 68,
          },
        ]

        // Merge objects with the same bank name
        let mergedData: any = {};
        data.forEach((item: any) => {
          if (!mergedData[item.Bank]) {
            mergedData[item.Bank] = { Bank: item.Bank, ...item };
          } else {
            for (const prop in item) {
              if (prop !== "Bank") {
                mergedData[item.Bank][prop] = mergedData[item.Bank][prop] ? mergedData[item.Bank][prop] + item[prop] : item[prop];
              }
            }
          }
        });

        // Convert merged data back to an array
        let mergedArray = Object.values(mergedData);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {});
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "Bank",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
          location: 1
        })

        xAxis.data.setAll(mergedArray);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererY.new(root, {
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
        function makeSeries(name: any, fieldName: any) {
          let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "Bank"
          }));

          series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}: {valueY}",
            tooltipY: am5.percent(10)
          });
          series.data.setAll(mergedArray);

          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();

          series.bullets.push(function () {
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

          legend.data.push(series);
        }

        makeSeries("Active", "Active");
        makeSeries("Inactive", "Inactive");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivProjectWisePR');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
