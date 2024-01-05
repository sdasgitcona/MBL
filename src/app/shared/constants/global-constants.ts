export class GlobalConstants {
  public static TABLE_PAGE_SIZE = 10;
  // public static SUPPLIER_TABLE_SORT_COLUMN = 's.vendorNumber';
  public static SUPPLIER_TABLE_SORT_COLUMN = 's.id';
  public static ASCENDING = 'asc';
  public static DESCENDING = 'desc';
  //public static PROJECT_TABLE_SORT_COLUMN = 'p.id';
  public static PROJECT_TABLE_SORT_COLUMN = 'p.id';
  //public static TAX_RATE_TABLE_SORT_COLUMN = 'effectiveFrom';
  public static TAX_RATE_TABLE_SORT_COLUMN = 't.id';
//Location Master LOV
  public static LOCATION_TABLE_SORT_COLUMN = 'b.id';
  public static SUBSIDIARY_TABLE_SORT_COLUMN = 's.id';
  public static BANKMASTER_TABLE_SORT_COLUMN = 'b.id';
  public static ITEM_TABLE_SORT_COLUMN = 'i.id';
  public static ROLE_TABLE_SORT_COLUMN = 'r.id';
  public static ACCOUNTCODE_TABLE_SORT_COLUMN = 'id';
  public static DOCSEQUENCE_TABLE_SORT_COLUMN = 'type';
  public static TAX_GROUP_TABLE_SORT_COLUMN = 't.id';
  public static EMPLOYEE_TABLE_SORT_COLUMN = 'e.id';
  public static COMPANYINFO_TABLE_SORT_COLUMN = 'cd.id';
  public static ISSUE_TABLE_SORT_COLUMN = 'i.id';
  public static PR_TABLE_SORT_COLUMN = 'p.id';
  public static FISCAL_TABLE_SORT_COLUMN = 'f.id';
  public static GENERALPREFERENCES_TABLE_SORT_COLUMN = 'gp.id';
  public static PO_TABLE_SORT_COLUMN = 'po.id';
  public static TEMPLATEMAPPING_TABLE_SORT_COLUMN = 't.id';
  public static APPROVAL_PREFERENCE_TABLE_SORT_COLUMN = 'ap.id';
  public static RFQ_TABLE_SORT_COLUMN = 'q.id';
  public static INVOICE_TABLE_SORT_COLUMN = 'i.invoiceId';
  public static QA_TABLE_SORT_COLUMN = 'qa.id';
  public static MAKEPAYMENT_TABLE_SORT_COLUMN = 'mp.id';
  public static GRN_TABLE_SORT_COLUMN = 'gr.id';
  public static ADVANCE_PAYMENT_TABLE_SORT_COLUMN = 'ap.id';
  public static CREATERFQPO_TABLE_SORT_COLUMN = 'pr.prNumber';
  public static MI_TABLE_SORT_COLUMN = 'id';
  public static DEBIT_NOTE_TABLE_SORT_COLUMN = 'd.id';
  public static RTV_TABLE_SORT_COLUMN = 'r.id';
  public static DEPARTMENT_TABLE_SORT_COLUMN = 'd.id';
  public static INVOICE_EMAILS_TABLE_SORT_COLUMN = 'ie.id';

  
  //Subsidiary LOV
  public static URL_SUBSIDIARY_GET_ALL_LOV = '/setup-ws/subsidiary/get/all/lov';
  public static URL_LOCATION_GET_BY_ID = '/masters-ws/location/get-parent-location-names';
  public static URL_CURRENCY_GET_BY_SUBSIDIARY = '/setup-ws/subsidiary/get';

  //urls
  public static URL_SUPPLIER_GET_ALL = '/masters-ws/supplier/get/all';
  public static URL_SUPPLIER_GET_ALL_LOV = '/setup-ws/subsidiary/get/all/lov';
  public static URL_PR_GET_ALL_LOV = '/setup-ws/subsidiary/get/all';
  public static URL_LOCATION_GET_ALL_LOV = '/masters-ws/location/get/all/lov';
  public static URL_PROJECT_GET_ALL_LOV = '/masters-ws/project/get/all/lov';
  public static URL_PR_SUBSIDIARY_GET_ALL = '/setup-ws/subsidiary/get/all';
 
  public static USER_CREATION_TABLE_SORT_COLUMN='ua.id'
  

}
