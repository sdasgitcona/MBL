export class StepOne{
    
    companyName:string;
    country:string;
    state:string;
    city:string;
    address1:string;
    address2:string;
    startYear:string;
    startMonth:string;
    endMonth:string;
    poCode:string;
    mail:string;
    departments:any=[];
    businessUnits:any=[];
    accountId:string;
    subsidiaryId:string;
    companyId:string

}

export class StepTwo
{
active:boolean=true;
subsidiaryId:number;
type:string;
prefix:string;
suffix:string;
minimumDigit:string;
initialNumber:string;
startDate:Date;
endDate:Date;
createdBy?: string;
lastModifiedBy?: string;
}

export class StepThree{
name?:string;
accountId?:string;
email?:string;
subsidiaryId?:string;
departmentId?:string;
roleId?:string;
selectedAccess?:string;
businessUnitId?:string;
createdBy?: string;
}

export class LoginDetails{
    username?:string;
    password?:string;
    email?:string;
    type?:string;
    subsidiaryId?:number;
   
}

export class CountryModel {
    country_name?: string;
    country_phone_code?: number;
    country_short_name?: string;
    country?: string;
  }
  export class StateModel {
    state_name?: string;
    state?: string;
  }
  export class CityModel {
    city_name?: string;
    city?: string;
  }
  export class type{
    name:string;
  }

  export class Role{
    id:string;
    selectedAccess:string;

  }
  
  export class Department{
    id:string;
    Name:string;

  }
  export class BusinessUnit{
    id:string;
    Name:string;

  }
  