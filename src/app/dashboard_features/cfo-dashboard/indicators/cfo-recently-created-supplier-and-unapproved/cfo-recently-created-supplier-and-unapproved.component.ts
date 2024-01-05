import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-cfo-recently-created-supplier-and-unapproved',
  templateUrl: './cfo-recently-created-supplier-and-unapproved.component.html',
  styleUrls: ['./cfo-recently-created-supplier-and-unapproved.component.scss']
})
export class CfoRecentlyCreatedSupplierAndUnapprovedComponent implements OnInit {

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  data: any;
  Cards: any[] = [];

  constructor(
    private dashboardDataUpdate: DashboardDataUpdateService,
    private httpService: CommonHttpService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("AllRoleList");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    // Get Subsidiary Id for CFO Dashboard from LocalStorage
    const GetCfoSubsidiaryId: any = localStorage.getItem("CFOSelectedSubId");
    this.selectedSubsidiaryId = JSON.parse(GetCfoSubsidiaryId);

    // subscribe to changes to the selected subsidiary id of indicators
    this.dashboardDataUpdate.getSubsidiaryId().subscribe((id: any) => {
      this.selectedSubsidiaryId = id;
      this.getApiData();
    });

    this.getApiData();
  }

  getApiData() {

    this.httpService
      .GetById(`/masters-ws/supplier/get-seven-days-old-and-total?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
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

          const selectedSubsidiaryIdAsString = this.selectedSubsidiaryId.toString();

          this.Cards = [];
          // Adding to Cards
          if (this.data && this.data.length > 0) {
            this.Cards.push({
              value: this.data[0].value,
              category: this.data[0].category,
              lowerValue: this.data[1].value,
              lowerCategory: this.data[1].category,
              link: '/main/supplier/list',
              param1: 'Recent',
              param2: selectedSubsidiaryIdAsString,
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
