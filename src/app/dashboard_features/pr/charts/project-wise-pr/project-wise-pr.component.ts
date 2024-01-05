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
  selector: 'app-project-wise-pr',
  templateUrl: './project-wise-pr.component.html',
  styleUrls: ['./project-wise-pr.component.scss']
})
export class ProjectWisePRComponent implements OnInit {


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

    this.httpService.GetById(`/procure-ws/pr/get-pr-count-for-project-name-total?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {
        let root = am5.Root.new("chartbarProjectWisePR");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
          //am5themes_Material.new(root)
          //am5themes_Spirited.new(root)
          
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
        //let colors = chart.get("colors");

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(root, {
          minGridDistance: 20
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
          fontSize: 11,
          fontWeight: "600",
          oversizedBehavior: "wrap",
          textAlign: "center"
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
        // let series = chart.get("colors").set("colors", [
        //   am5.color(0x095256),
        //   am5.color(0x087f8c),
        //   am5.color(0x5aaa95),
        //   am5.color(0x86a873),
        //   am5.color(0xbb9f06)
        // ]);
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: "categoryX",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
          //fill: am5.color(0xfc030f),
          //stroke: am5.color(0xbb9f06)
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

        // heatrule
        // series.set('heatRules', [
        //   {
        //     dataField: 'valueX',
        //     min: am5.color(0x0352fc),
        //     max: am5.color(0xfc030f),
        //     target: series.columns.template,
        //     key: 'fill',
        //   },
        // ]);

        let columnTemplate:any = series.columns.template;
        series.set('heatRules', [
          {
            dataField: 'valueY',
            min: am5.color(0x0352fc),
            max: am5.color(0xfc030b),
            target: series.columns.template,
            key: 'fill',
          },
        ])
        // columnTemplate.setAll({
        //   draggable: true,
        //   cursorOverStyle: "pointer",
        //   tooltipText: "drag to rearrange",
        //   cornerRadiusBR: 10,
        //   cornerRadiusTR: 10
        // });

        columnTemplate.adapters.add("fill", (fill:any, target:any)=>{
          return chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });


        series.data.setAll(res);

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
          fontSize: 11,
          fontWeight: "600",
          
        });

        legend.valueLabels.template.setAll({
          fontSize: 11,
          fontWeight: "600"
        });

        legend.data.setAll(series.dataItems);

      });

  };

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivProjectWisePR');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }


}
