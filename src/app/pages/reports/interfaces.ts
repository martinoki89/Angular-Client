export interface IHolding {
  Currency: string;
  CurrencySign: string;
  Value: number;
  DateRequested: string;
  Date: string | null;
}

export interface IVoucher {
  ID: string;
  Type: string;
  Description: string;
  Holdings: IHolding[];
}

export interface IVouchers {
  [key: string]: IVoucher;
}

export interface IReport {
  Inflation: number;
  Vouchers: IVouchers;
}
