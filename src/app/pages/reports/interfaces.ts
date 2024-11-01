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
  Description?: string;
  Holdings: IHolding[];
  Denomination: string;
  Category: string;
  Transactions: any[];
}

export interface IVouchers {
  [key: string]: IVoucher[];
}

export interface IReport {
  VouchersByCategory: IVouchers;
}
