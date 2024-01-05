import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

@Component({
  selector: 'app-incoming-invoices',
  templateUrl: './incoming-invoices.component.html',
  styleUrls: ['./incoming-invoices.component.scss']
})
export class IncomingInvoicesComponent implements OnInit {

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  data: any[] = [];
  Cards: any[] = [];

  constructor(
    private httpService: CommonHttpService
  ) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("AllRoleList");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.getApiData();
  }

  getApiData() {
    this.httpService
      .GetById(`/masters-ws/supplier/get-supplier-dashboard-by-approval-status?SubsidiaryId=` + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
      .subscribe((res) => {
        if (res.status == 401) {
          alert("Unauthorized Access !");
        }
        else if (res.status == 404) {
          alert("Wrong/Invalid Token!");
        }
        else {
          console.log(res);
          this.data = res;

          // Adding to Cards
          if (this.data && this.data.length > 0) {
            this.Cards.push({
              value: this.data[0].value,
              category: this.data[0].category,
              lowerValue: this.data[1].value,
              lowerCategory: this.data[1].category
            });
          }
        }
      });
  }

}
