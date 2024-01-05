import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { TaxRateRuleAddEditComponent } from 'src/app/features/tax-rate-rule/tax-rate-rule-add-edit/tax-rate-rule-add-edit.component';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-cfo-total-outstanding-by-subsidiary-bar',
  templateUrl: './cfo-total-outstanding-by-subsidiary-bar.component.html',
  styleUrls: ['./cfo-total-outstanding-by-subsidiary-bar.component.scss']
})
export class CfoTotalOutstandingBySubsidiaryBarComponent implements OnInit {

  isFullscreen: any = false;

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  chartData: any;
  series: any;
  chart: any;
  legend: any;
  xAxis: any;
  makeSeries: any;
  fromDate: any;
  toDate: any;
  months: any = [
    { name: 'Monthly', code: '1' },
    { name: 'Quartely', code: '3' },
    { name: 'Halfyearly', code: '6' },
    { name: 'Yearly', code: '12' },
  ]
  selectedMonth: any = this.months[0].code;
  subsudiaryCount: any = [5, 10, 15];
  selectedSubsudiaryCount: any = this.subsudiaryCount[0];
  show: any;

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

    // Get Subsidiary Id for CFO Dashboard from LocalStorage
    const GetCfoSubsidiaryId: any = localStorage.getItem("CFOSelectedSubId");
    this.selectedSubsidiaryId = JSON.parse(GetCfoSubsidiaryId);

    // subscribe to changes to the selected subsidiary id of indicators
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: any) => {
      this.selectedSubsidiaryId = id;
      this.updateChart();
    });

    this.initbarSort();
  }

  initbarSort() {

    this.httpService.GetById(`/finance-ws/invoice/get-total-outstandings?subsidiaryIds=`+this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        console.log(res)

        let merged: { category: any;[key: string]: any }[] = [];

        res.forEach((item: { category: any; currency: string | number; amount: any; }) => {
          let existingItem = merged.find(i => i.category === item.category);
          if (existingItem) {
            existingItem[item.currency] = item.amount;
          } else {
            let newItem: { category: any;[key: string]: any } = {
              category: item.category
            };
            newItem[item.currency] = item.amount;
            merged.push(newItem);
          }
        });

        console.log(merged);
        this.chartData = merged;

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("totalOutstandingBySubsidiary");


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


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        this.legend = this.chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
          })
        );

        this.legend.labels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        this.legend.valueLabels.template.setAll({
          fontSize: 8,
          fontWeight: "100"
        });

        // this.show = [
        //   {
        //     "name": "Google India Ltd",
        //     "total_Returned": 6,
        //     "total_Received": 4
        //   },
        //   {
        //     "name": "Sony India Ltd",
        //     "total_Returned": 2,
        //     "total_Received": 5
        //   },
        //   {
        //     "name": "fvevev",
        //     "total_Returned": 2,
        //     "total_Received": 3
        //   },
        //   {
        //     "name": "AK",
        //     "total_Returned": 1,
        //     "total_Received": 8
        //   },
        //   {
        //     "name": "Google Ltd",
        //     "total_Returned": 4,
        //     "total_Received": 4
        //   },
        //   {
        //     "name": "Sony Ltd",
        //     "total_Returned": 1,
        //     "total_Received": 5
        //   },
        //   {
        //     "name": "sdvsdf",
        //     "total_Returned": 4,
        //     "total_Received": 3
        //   },
        //   {
        //     "name": "AKR",
        //     "total_Returned": 3,
        //     "total_Received": 8
        //   }
        // ];

        // Sort the array based on total_Returned property in ascending order
        // this.show.sort((a: { total_Returned: number; }, b: { total_Returned: number; }) => a.total_Returned - b.total_Returned);

        // this.chartData = show;

        // this.chartData = this.show.slice(0, this.selectedSubsudiaryCount);
        this.chartData = this.chartData.slice(0, this.selectedSubsudiaryCount);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        // let xRenderer = am5xy.AxisRendererX.new(root, {
        //   cellStartLocation: 0.1,
        //   cellEndLocation: 0.9
        // })

        let xRenderer = am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "category",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        // Enable label wrapping
        xRenderer.labels.template.setAll({
          fontSize: 10,
          oversizedBehavior: "wrap",
          textAlign: "left"
        });

        xRenderer.grid.template.setAll({
          location: 1
        })

        this.xAxis.data.setAll(this.chartData);

        let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
          })
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.makeSeries = (name: any, fieldName: any) => {
          this.series = this.chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: this.xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "category"
          }));

          root.interfaceColors.set("grid", am5.color(0xff0000));

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

          this.series.data.setAll(this.chartData);

          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          this.series.appear();

          this.series.bullets.push(function () {
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

          this.legend.data.push(this.series);
        }

        // Set Color
        this.chart.get("colors").set("colors", [
          am5.color("#FF0040"),
          am5.color("#39FF14"),
          am5.color("#0000FF"),
        ]);

        this.makeSeries("BDT", "BDT");
        this.makeSeries("INR", "INR");
        this.makeSeries("USD", "USD");

        // const currencies = [...new Set(this.chartData.map((item: { currency: any; }) => item.currency))];
        // currencies.forEach(currency => {
        //   this.makeSeries(currency, currency);
        // });

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.chart.appear(1000, 100);

      });

  };

  updateChart() {
    this.httpService.GetById(`/finance-ws/advance/get-total-advance-payment-currency-wise?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;
        this.initbarSort();

        // Update chartData
        // this.chartData = newData;

        // Update existing series data points
        this.series.data.clear();
        this.series.data.setAll(this.chartData);

        // Update Chart
        this.xAxis.data.setAll(this.chartData);
        this.series.appear();
        this.chart.appear(1000, 100);
      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalOutstandingBySubsidiary');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
