import { Directive, Output, EventEmitter } from '@angular/core';
import { CommonHttpService } from 'src/app/core/services/common-http.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Directive({
  selector: '[appPendingAccess]'
})
export class PendingAccessDirective {

  @Output() CardsReady = new EventEmitter<any>();

  SubsidiaryId: any;
  RetloginDetails: any;
  selectedSubsidiaryId: any;
  data: any[] = [];
  Cards: any[] = [];

  constructor(
    private httpService: CommonHttpService,
    private toastService: ToastService,
  ) { }

  getApiData(token: any, subsidiaryId: any) {
    this.httpService
    .GetById(`/setup-ws/company-data/get-pending-access-count`, subsidiaryId, token)
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
              value: this.data[0].value,
              category: 'Pending Access',
              link: '/main/company/list',
              param:'Pending',
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
