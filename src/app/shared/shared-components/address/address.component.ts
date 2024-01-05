import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SupplierAddress } from 'src/app/features/supplier/model/supplier-model';
import { StateModel, CityModel, CountryModel } from './model/address.model';
import { AddressService } from './service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() address: SupplierAddress = new SupplierAddress();
  @Output() addressSave = new EventEmitter();
  @Output() addressCancel = new EventEmitter();
  // outputModel : {sucess:boolean, value:SupplierAddress} = {
  //   sucess : false,
  //   value : {}
  // }

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.GenrateAccessTokenAndGetCountries();
  }

  onClose() {
    // this.outputModel.sucess = false;
    this.addressCancel.emit(this.address);
  }

  onSave() {
    // this.outputModel.sucess = true;
    this.addressSave.emit(this.address);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.addressSave.unsubscribe();
    this.addressCancel.unsubscribe();
  }

  /*Start Fetch County List api access token */
  GenrateAccessTokenAndGetCountries() {
    this.addressService.GetAccessToken().subscribe(
      (res) => {
        console.log(res);
        //this.countryviewModels=res;
        this.GetCountryList();
      },
      (error) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  /*Start Fetch County List */
  countries: CountryModel[] = [];
  GetCountryList() {
    this.addressService.GetCountryList().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
        this.countries.map((item) => {
          item.country = item.country_name;
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
  /* End Fetch County List */
  // Adsress country state city binding
  states: StateModel[] = [];
  GetStateList(country: any) {
    if (country) {
      this.address.country = country.value; 
      this.addressService.GetStateList(country.value).subscribe((res) => {
        console.log(res);
        this.states = res;
        this.states.map((item) => {
          item.state = item.state_name;
        });
      });
    }
  }

  // Adsress country state city binding
  cities: CityModel[] = [];
  GetCityList(state: any) {
    this.address.state = state.value;
    if (state) {
      this.addressService.GetCityList(state.value).subscribe((res) => {
        console.log(res);
        this.cities = res;
        this.cities.map((item) => {
          item.city = item.city_name;
        });
      });
    }
  }

  // Adsress country state city binding
  GetStateListByString(country: string) {
    if (country) {
      // this.address.country = country;
      this.addressService.GetStateList(country).subscribe((res) => {
        console.log(res);
        this.states = res;
        this.states.map((item) => {
          item.state = item.state_name;
        });
      });
    }
  }

  // Adsress country state city binding
  GetCityListByString(state: string) {
    // this.address.state = state;
    if (state) {
      this.addressService.GetCityList(state).subscribe((res) => {
        console.log(res);
        this.cities = res;
        this.cities.map((item) => {
          item.city = item.city_name;
        });
      });
    }
  }

  onCityChange(city: any) {
    this.address.city = city.value;
  }
}
