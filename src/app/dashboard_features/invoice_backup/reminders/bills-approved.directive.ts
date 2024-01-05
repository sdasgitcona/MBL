import { Directive } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

@Directive({
  selector: '[appBillsApproved]'
})
export class BillsApprovedDirective {

  @Output() CardsReady = new EventEmitter<any>();

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  data: any[] = [];
  Cards: any[] = [];

  constructor(
    private httpService: CommonHttpService
  ) { }

  getApiData(token: any, subsidiaryId: any) {
    this.httpService
      .GetById(`/masters-ws/supplier/get-supplier-dashboard-by-approval-status?SubsidiaryId=` + subsidiaryId, subsidiaryId, token)
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
              category: this.data[0].category
            });
          }

          // Emitting allCardsReady event with allCards data
          this.CardsReady.emit(this.Cards);
        }
      });
  }

}
