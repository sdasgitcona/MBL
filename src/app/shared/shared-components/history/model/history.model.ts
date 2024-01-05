export class HistoryModel {
  id?: number;
  subsidiaryId?: number;
  childId?: number;
  moduleName?: string;
  operation?: string;
  fieldName?: string;
  changeType?: string;
  newValue?: string;
  oldValue?: string;
  lastModifiedBy?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  test: Array<number>;
}
