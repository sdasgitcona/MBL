import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-recently-created-po',
  templateUrl: './recently-created-po.component.html',
  styleUrls: ['./recently-created-po.component.scss']
})
export class RecentlyCreatedPOComponent implements OnInit {

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  data: any[] = [];
  Cards: any[] = [];

  constructor(private httpService: CommonHttpService,private toastService: ToastService,) { }

  ngOnInit(): void {
    const RDetails: any = localStorage.getItem("RoleDTLS");
    this.SubsidiaryId = JSON.parse(RDetails);

    const LDetails: any = localStorage.getItem("LoggerDTLS");
    this.RetloginDetails = JSON.parse(LDetails);

    this.selectedSubsidiaryId = this.SubsidiaryId[0].subsidiaryId;

    this.getApiData();
  }
  getApiData(){
    this.httpService
    .GetById('/procure-ws/po/get-seven-days-old-po?subsidiaryId=' + this.selectedSubsidiaryId, this.selectedSubsidiaryId, this.RetloginDetails.token)
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
        if (this.data && this.data.length > 0) {
          this.Cards.push({
            value: this.data[0].value,
            category: this.data[0].category,
            value1: this.data[1].value,
            category1: this.data[1].category
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
