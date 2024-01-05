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
  selector: 'app-total-received-and-return-supplier-bar',
  templateUrl: './total-received-and-return-supplier-bar.component.html',
  styleUrls: ['./total-received-and-return-supplier-bar.component.scss']
})
export class TotalReceivedAndReturnSupplierBarComponent implements OnInit {

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
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    const SubID: any = localStorage.getItem("subID");
    this.SUBID = JSON.parse(SubID);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.getCurrentDate();
    this.updateFromDate();
    this.initbarSort();
  }

  initbarSort() {

    this.httpService.GetById(`/procure-ws/grn/get-status-wise-count-supplier-basis?subsidiaryId=` + this.selectedSubsidiaryId + `&fromDate=` + this.fromDate + `&toDate=` + this.toDate, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        this.chartData = res;

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("TotalReceiveAndReturnGRN");


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
          categoryField: "name",
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
            categoryXField: "name"
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
        ]);

        this.makeSeries("Total Returned", "total_Returned");
        this.makeSeries("Total Received", "total_Received");

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.chart.appear(1000, 100);

      });

  };

  updateChart() {
    this.getDate();
    this.updateFromDate();
    this.httpService.GetById(`/procure-ws/grn/get-status-wise-count-supplier-basis?subsidiaryId=` + this.selectedSubsidiaryId + `&fromDate=` + this.fromDate + `&toDate=` + this.toDate, this.selectedSubsidiaryId, this.RetloginDetails.token)
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

  getDate() {
    const dateStr: any = this.fromDate;
    const ToDateStr: any = this.toDate;
    const date = new Date(dateStr);
    const ToDate = new Date(ToDateStr);

    const year = date.getFullYear(); // Get the year (e.g., 2023)
    const ToDateyear = ToDate.getFullYear(); // Get the year (e.g., 2023)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (e.g., 05)
    const ToDatemonth = (ToDate.getMonth() + 1).toString().padStart(2, "0"); // Get the month (e.g., 05)
    const day = date.getDate().toString().padStart(2, "0"); // Get the day (e.g., 15)
    const ToDateday = ToDate.getDate().toString().padStart(2, "0"); // Get the day (e.g., 15)

    this.fromDate = `${year}-${month}-${day}`; // Combine the components into the desired format
    this.toDate = `${ToDateyear}-${ToDatemonth}-${ToDateday}`; // Combine the components into the desired format
  }

  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.toDate = `${year}-${month}-${day}`;
  }

  updateFromDate() {
    const toDateObj = new Date(this.toDate);
    toDateObj.setMonth(toDateObj.getMonth() - this.selectedMonth);
    const year = toDateObj.getFullYear();
    const month = String(toDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(toDateObj.getDate()).padStart(2, '0');
    this.fromDate = `${year}-${month}-${day}`;
  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivProjectWiseTotalReceiveAndReturnGRN');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
