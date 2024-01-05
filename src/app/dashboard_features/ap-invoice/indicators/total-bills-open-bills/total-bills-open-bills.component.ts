import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-total-bills-open-bills',
  templateUrl: './total-bills-open-bills.component.html',
  styleUrls: ['./total-bills-open-bills.component.scss']
})
export class TotalBillsOpenBillsComponent implements OnInit {

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  SUBID: any;
  data: any[] = [];
  Cards: any[] = [];

  constructor(
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService,
    private toastService: ToastService,
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
      this.getApiData();
    });

    this.getApiData();
  }

  getApiData() {
    this.httpService
      .GetById(`/finance-ws/invoice/open-and-total-bills-count-for-invoice?subsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe((res) => {
        if (res.status == 401) {
          this.showAlert("Unauthorized Access !");
        }
        else if (res.status == 404) {
          this.showAlert("Wrong/Invalid Token!");
        }
        else {
          // console.log(res);
          this.data = res;

          // Adding to Cards
          this.Cards = [];
          if (this.data && this.data.length > 0) {
            this.Cards.push({
              value1: this.data[0].value,
              category1: this.data[0].category,
              value2: this.data[1].value,
              category2: this.data[1].category
            });
          }
        }
      });
  }

  showAlert(AlertMSG:any) {
    this.toastService.addSingle(
      'error',
      'Error',
      AlertMSG
    );
  }

}
