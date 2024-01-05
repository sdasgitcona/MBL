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
  selector: 'app-cfo-invoice-aging-for-subsidiaryids-bar',
  templateUrl: './cfo-invoice-aging-for-subsidiaryids-bar.component.html',
  styleUrls: ['./cfo-invoice-aging-for-subsidiaryids-bar.component.scss']
})
export class CfoInvoiceAgingForSubsidiaryidsBarComponent implements OnInit {

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

    this.httpService.GetById(`/finance-ws/invoice/get-subsidiary-wise-invoice-aging-summary?subsidiaryIds=`+this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        
        let merged: { subsidiaryName: any;[key: string]: any }[] = [];

        res.forEach((item: { subsidiaryName: any; category: string | number; value: any; }) => {
          let existingItem = merged.find(i => i.subsidiaryName === item.subsidiaryName);
          if (existingItem) {
            existingItem[item.category] = item.value;
          } else {
            let newItem: { subsidiaryName: any;[key: string]: any } = {
              subsidiaryName: item.subsidiaryName
            };
            newItem[item.category] = item.value;
            merged.push(newItem);
          }
        });

        this.chartData = merged;

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("invoiceAgingForsubsidiary");


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
          wheelX: "panX",
          wheelY: "zoomX",
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
          categoryField: "subsidiaryName",
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
            categoryXField: "subsidiaryName"
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

        // this.makeSeries("10Days count", "10Days count");
        // this.makeSeries("20Days count", "20Days count");
        // this.makeSeries("30Days count", "30Days count");
        // this.makeSeries("7Days count", "7Days count");
        // this.makeSeries("14Days count", "14Days count");
        // this.makeSeries("21Days count", "21Days count");

        const currencies = [...new Set(res.map((item: { category: any; }) => item.category))];
        currencies.forEach(category => {
          this.makeSeries(category, category);
        });

        // const currencies = [...new Set(res.map((item:any) => item.category))];
        // currencies.forEach(category => {
        //   this.makeSeries(category, category);
        // });

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.chart.appear(1000, 100);

      });

  };

  updateChart() {
    this.httpService.GetById(`finance-ws/invoice/get-subsidiary-wise-invoice-aging-summary?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
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
    let div = document.querySelector('.fullscreenDivInvoiceAgingForsubsidiary');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}




// ////////////////////////////////////////////////////////////////////////////////// TEST //////////////////////////////////////////////////////////////////////

// import { Component, OnInit } from '@angular/core';
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5radar from "@amcharts/amcharts5/radar";
// import * as am5percent from "@amcharts/amcharts5/percent";
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import { CommonHttpService } from 'src/app/core/services/common-http.service';
// import { TaxRateRuleAddEditComponent } from 'src/app/features/tax-rate-rule/tax-rate-rule-add-edit/tax-rate-rule-add-edit.component';
// import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';

// @Component({
//   selector: 'app-active-inactive-registration-bar',
//   templateUrl: './active-inactive-registration-bar.component.html',
//   styleUrls: ['./active-inactive-registration-bar.component.scss']
// })
// export class ActiveInactiveRegistrationBarComponent implements OnInit {

//   isFullscreen: any = false;

//   SubsidiaryId: any;
//   RetloginDetails: any;
//   selectedSubsidiaryId: any;
//   SUBID: any;
//   xAxis: any;
//   chartData: any;
//   series: any;
//   chart: any;
//   year: any = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028]
//   selectedYear: any = this.year[3];

//   constructor(
//     private dashboardDataUpdate: DashboardDataUpdateService,
//     private httpService: CommonHttpService
//   ) { }

//   ngOnInit(): void {
//     const RDetails: any = localStorage.getItem("AllRoleList");
//     this.SubsidiaryId = JSON.parse(RDetails);

//     const LDetails: any = localStorage.getItem("LoggerDTLS");
//     this.RetloginDetails = JSON.parse(LDetails);

//     const SubID: any = localStorage.getItem("subID");
//     this.SUBID = JSON.parse(SubID);

//     this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId == undefined ? this.SUBID : this.SubsidiaryId[0].subsidiaryId;

//     // subscribe to changes to the selected subsidiary id of reminders
//     this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: number) => {
//       this.selectedSubsidiaryId = id;
//       this.initbarSort();
//     });

//     this.initbarSort();
//   }


//   initbarSort() {

//     this.httpService.GetById(`/setup-ws/company-data/registration/active-inactive?year=` + this.selectedYear, this.selectedSubsidiaryId, this.RetloginDetails.token)
//       .subscribe(res => {
//         // let data = [
//         //   {
//         //     "name": "Ganesh & Co.",
//         //     "amount": 5777.0,
//         //     "currency": "INR"
//         //   },
//         //   {
//         //     "name": "Ganesh & Co.",
//         //     "amount": 3245.0,
//         //     "currency": "USD"
//         //   },
//         //   {
//         //     "name": "Ganesh & Co.",
//         //     "amount": 2323.0,
//         //     "currency": "XYZ"
//         //   },
//         //   {
//         //     "name": "CMS Info",
//         //     "amount": 3235.8,
//         //     "currency": "BDT"
//         //   },
//         //   {
//         //     "name": "CMS Info",
//         //     "amount": 3083.0,
//         //     "currency": "INR"
//         //   },
//         //   {
//         //     "name": "CMS Info",
//         //     "amount": 1900.0,
//         //     "currency": "USD"
//         //   }
//         // ];

//         let data = [
//           {
//               "name": "CMS Info",
//               "currency": "7Days count",
//               "amount": 232
//           },
//           {
//               "name": "CMS Info",
//               "currency": "14Days count",
//               "amount": 312
//           },
//           {
//               "name": "CMS Info",
//               "currency": "21Days count",
//               "amount": 231
//           },
//           {
//               "name": "Mphasis",
//               "currency": "10Days count",
//               "amount": 341
//           },
//           {
//               "name": "Mphasis",
//               "currency": "20Days count",
//               "amount": 121
//           },
//           {
//               "name": "Mphasis",
//               "currency": "30Days count",
//               "amount": 221
//           },
//           {
//               "name": "GDPL Solution India Pvt Ltd ",
//               "currency": "15Days count",
//               "amount": 311
//           },
//           {
//               "name": "GDPL Solution India Pvt Ltd ",
//               "currency": "30Days count",
//               "amount": 211
//           },
//           {
//               "name": "GDPL Solution India Pvt Ltd ",
//               "currency": "45Days count",
//               "amount": 222
//           },
//           {
//               "name": "Conacent Consulting Pvt. Ltd.",
//               "currency": "10Days count",
//               "amount": 122
//           },
//           {
//               "name": "Conacent Consulting Pvt. Ltd.",
//               "currency": "20Days count",
//               "amount": 132
//           },
//           {
//               "name": "Conacent Consulting Pvt. Ltd.",
//               "currency": "30Days count",
//               "amount": 121
//           }
//       ];
    
//         let merged: { name: any;[key: string]: any }[] = [];
    
//         data.forEach(item => {
//           let existingItem = merged.find(i => i.name === item.name);
//           if (existingItem) {
//             existingItem[item.currency] = item.amount;
//           } else {
//             let newItem: { name: any;[key: string]: any } = {
//               name: item.name
//             };
//             newItem[item.currency] = item.amount;
//             merged.push(newItem);
//           }
//         });
    
//         console.log(merged);

//         res = merged;

//         this.chartData = res;
//         /* Chart code */
//         // Create root element
//         // https://www.amcharts.com/docs/v5/getting-started/#Root_element
//         let root = am5.Root.new("ActiveInactiveRegistration");


//         // Set themes
//         // https://www.amcharts.com/docs/v5/concepts/themes/
//         root.setThemes([
//           am5themes_Animated.new(root)
//         ]);


//         // Create chart
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/
//         this.chart = root.container.children.push(am5xy.XYChart.new(root, {
//           panX: false,
//           panY: false,
//           // wheelX: "panX",
//           // wheelY: "zoomX",
//           layout: root.verticalLayout
//         }));

//         // Add scrollbar
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
//         // chart.set("scrollbarX", am5.Scrollbar.new(root, {
//         //   orientation: "horizontal"
//         // }));

//         // let data: any = [
//         //   {
//         //     "Bank": "SERVICE",
//         //     "Active": 334,
//         //     "Inactive": 52,
//         //   },
//         //   {
//         //     "Bank": "GOODS",
//         //     "Active": 134,
//         //     "Inactive": 44,
//         //   },
//         //   {
//         //     "Bank": "BOTH",
//         //     "Active": 234,
//         //     "Inactive": 68,
//         //   },
//         // ]

//         // // Merge objects with the same bank name
//         // let mergedData: any = {};
//         // data.forEach((item: any) => {
//         //   if (!mergedData[item.Bank]) {
//         //     mergedData[item.Bank] = { Bank: item.Bank, ...item };
//         //   } else {
//         //     for (const prop in item) {
//         //       if (prop !== "Bank") {
//         //         mergedData[item.Bank][prop] = mergedData[item.Bank][prop] ? mergedData[item.Bank][prop] + item[prop] : item[prop];
//         //       }
//         //     }
//         //   }
//         // });

//         // // Convert merged data back to an array
//         // let mergedArray = Object.values(mergedData);

//         // Create axes
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
//         let xRenderer = am5xy.AxisRendererX.new(root, {});
//         this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//           categoryField: "name",
//           renderer: xRenderer,
//           tooltip: am5.Tooltip.new(root, {})
//         }));

//         xRenderer.grid.template.setAll({
//           location: 1
//         })

//         // Enable label wrapping
//         xRenderer.labels.template.setAll({
//           fontSize: 10,
//           oversizedBehavior: "wrap",
//           textAlign: "center"
//         });

//         this.xAxis.data.setAll(this.chartData);

//         let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
//           min: 0,
//           renderer: am5xy.AxisRendererY.new(root, {
//             strokeOpacity: 0.1
//           })
//         }));


//         // Add legend
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
//         let legend = this.chart.children.push(am5.Legend.new(root, {
//           centerX: am5.p50,
//           x: am5.p50
//         }));


//         // Add series
//         // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
//         const makeSeries = (name: any, fieldName: any) => {
//           this.series = this.chart.series.push(am5xy.ColumnSeries.new(root, {
//             name: name,
//             stacked: true,
//             xAxis: this.xAxis,
//             yAxis: yAxis,
//             valueYField: fieldName,
//             categoryXField: "name"
//           }));

//           this.series.columns.template.setAll({
//             tooltipText: "{valueY}",
//             tooltipY: am5.percent(10)
//           });
//           this.series.data.setAll(this.chartData);

//           root.interfaceColors.set("grid", am5.color(0xff0000));

//           // Make stuff animate on load
//           // https://www.amcharts.com/docs/v5/concepts/animations/
//           this.series.appear();

//           this.series.bullets.push(function () {
//             return am5.Bullet.new(root, {
//               sprite: am5.Label.new(root, {
//                 text: "{valueY}",
//                 fill: root.interfaceColors.get("alternativeText"),
//                 centerY: am5.p50,
//                 centerX: am5.p50,
//                 populateText: true
//               })
//             });
//           });

//           legend.labels.template.setAll({
//             fontSize: 10,
//             fontWeight: "100"
//           });
  
//           legend.valueLabels.template.setAll({
//             fontSize: 10,
//             fontWeight: "100"
//           });

//           legend.data.push(this.series);
//         }

//         // Set Color
//         this.chart.get("colors").set("colors", [
//           am5.color("#39FF14"),
//           am5.color("#FF0040"),
//           am5.color("#0000FF"),
//         ]);

//         const currencies = [...new Set(data.map(item => item.currency))];
//         currencies.forEach(currency => {
//           makeSeries(currency, currency);
//         });

//         // makeSeries("BDT", "BDT");
//         // makeSeries("INR", "INR");
//         // makeSeries("USD", "USD");


//         // Make stuff animate on load
//         // https://www.amcharts.com/docs/v5/concepts/animations/
//         this.chart.appear(1000, 100);
//       });

//   };

//   updateChart() {
//     this.httpService.GetById(`/setup-ws/company-data/registration/active-inactive?year=` + this.selectedYear, this.selectedSubsidiaryId, this.RetloginDetails.token)
//       .subscribe(res => {
//         this.chartData = res;
//         this.initbarSort();

//         this.xAxis.data.setAll(this.chartData);
//         this.series.data.setAll(this.chartData);
//         this.chart.appear(1000, 100);

//       });
//   }

//   toggleFullscreen() {
//     let div = document.querySelector('.fullscreenDivActiveInactiveRegistration');
//     div?.classList.toggle('fullscreen');
//     this.isFullscreen = !this.isFullscreen;
//   }

// }
