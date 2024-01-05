import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5core from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

am5.addLicense("AM5C367311118");

@Component({
  selector: 'app-pr-to-rfq-and-po',
  templateUrl: './pr-to-rfq-and-po.component.html',
  styleUrls: ['./pr-to-rfq-and-po.component.scss']
})
export class PrToRfqAndPoComponent implements OnInit {

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
    this.initAPIPie();
  }

  initAPIPie() {
    this.httpService.GetById(`/procure-ws/pr/get-pr-to-rfq-and-pr-to-po-count?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe(res => {

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("chartdivPie");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        let chart = root.container.children.push(am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(
          am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270,
          })
        );

        series.labels.template.setAll({
          fontSize: 9,
          maxWidth: 60,
          // text: "{category}: {value}",
          text: "{value}",
          oversizedBehavior: "wrap" // to truncate labels, use "truncate"
        });

        series.states.create("hidden", {
          endAngle: -90
        });

        ///   Pie Color Set   ///
        series.get("colors")?.set("colors", [
          am5.color("#BF00FF"),
          am5.color("#FF69B4"),
          am5.color("#FF0000"),
          am5.color("#FF6600"),
          am5.color("#00FFEE"),
        ]);

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(res);

        // Create legend
        let legend = chart.children.push(am5.Legend.new(root, {
          x: am5.percent(50),
          centerX: am5.percent(50),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true
          })
        }));

        legend.labels.template.setAll({
          fontSize: 10,
          fontWeight: "100",
        });

        legend.valueLabels.template.setAll({
          fontSize: 10,
          fontWeight: "100",
        });
        legend.data.setAll(series.dataItems);

      });

  }

  toggleFullscreen() {
    let div = document.querySelector('.fullscreenDivTotalRfqPo');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

}
