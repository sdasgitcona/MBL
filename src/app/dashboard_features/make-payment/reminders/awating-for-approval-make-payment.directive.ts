import { Directive, Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Directive({
  selector: '[appAwatingForApprovalMakePayment]'
})
export class AwatingForApprovalMakePaymentDirective {

  @Output() CardsReady = new EventEmitter<any>();

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  // data: any[] = [];
  data: any;
  Cards: any[] = [];

  constructor(
    private httpService: CommonHttpService,
    private toastService: ToastService,
  ) { }

  getApiData(employeeId: any,token: any, subsidiaryId: any) {
    this.httpService
    .GetById(`/finance-ws/payment/pending-partial-count?empId=${employeeId}&subsidiaryId=${subsidiaryId}`,subsidiaryId,token)
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
          // if (this.data && this.data.length > 0) {
          if (this.data) {
            this.Cards.push({
              // value: this.data[0].value,
              value: this.data.value,
              category: 'Awating for Approval Make Payment',
              link: '/main/make-payment/MP_Approval',
              param:'Approval',
              //category: this.data[0].category
            });
          }

          // Emitting allCardsReady event with allCards data
          this.CardsReady.emit(this.Cards);
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
