import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { DashboardDataUpdateService } from 'src/app/core/services/dashboard-data-update.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-cfo-total-invoice-and-unapproved',
  templateUrl: './cfo-total-invoice-and-unapproved.component.html',
  styleUrls: ['./cfo-total-invoice-and-unapproved.component.scss']
})
export class CfoTotalInvoiceAndUnapprovedComponent implements OnInit {

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
      .GetById(`/finance-ws/invoice/total-invoice-and-unapproved?subsidiaryIds=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
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
              link: '/main/apinvoice/list',
              param1: 'UnapprovedInvoice',
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
