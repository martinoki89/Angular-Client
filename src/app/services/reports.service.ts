import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getReportDataByDate(
    accountId: string,
    date: string,
    daysInterval: null | number = 1,
    monthsInterval: null | number = 0,
    weeksInterval: null | number = 0
  ): Observable<any> {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    const inverval = `${monthsInterval}m:${weeksInterval}w:${daysInterval}d`;
    const url = `${this.apiUrl}/accounts/${accountId}?date=${year}-${month
      .toString()
      .padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}&interval=${inverval}`;
    return this.http.get<any>(url);
  }

  getReportDataByRange(
    accountId: string,
    startDate: string,
    endDate: string,
    daysInterval: null | number = 1,
    monthsInterval: null | number = 0,
    weeksInterval: null | number = 0
  ): Observable<any> {
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth() + 1;
    const startDay = new Date(startDate).getDate();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth() + 1;
    const endDay = new Date(endDate).getDate();
    const inverval = `${monthsInterval}m:${weeksInterval}w:${daysInterval}d`;
    const url = `${
      this.apiUrl
    }/accounts/${accountId}?startDate=${startYear}-${startMonth
      .toString()
      .padStart(2, '0')}-${startDay
      .toString()
      .padStart(2, '0')}&endDate=${endYear}-${endMonth
      .toString()
      .padStart(2, '0')}-${endDay
      .toString()
      .padStart(2, '0')}&interval=${inverval}`;
    return this.http.get<any>(url, {});
  }
  exportXls(
    params: any,
    accountId: string,
    daysInterval: null | number = 1,
    monthsInterval: null | number = 0,
    weeksInterval: null | number = 0
  ) {
    let dates: string;
    const interval = `${monthsInterval}m:${weeksInterval}w:${daysInterval}d`;
    if (params?.startDate && params?.endDate) {
      const startYear = new Date(params.startDate).getFullYear();
      const startMonth = new Date(params.startDate).getMonth() + 1;
      const startDay = new Date(params.startDate).getDate();
      const endYear = new Date(params.endDate).getFullYear();
      const endMonth = new Date(params.endDate).getMonth() + 1;
      const endDay = new Date(params.endDate).getDate();
      dates = `startDate=${startYear}-${startMonth
        .toString()
        .padStart(2, '0')}-${startDay
        .toString()
        .padStart(2, '0')}&endDate=${endYear}-${endMonth
        .toString()
        .padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`;
    } else {
      const year = new Date(params.date).getFullYear();
      const month = new Date(params.date).getMonth() + 1;
      const day = new Date(params.date).getDate();
      dates = `date=${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
    }
    const url = `${this.apiUrl}/reports/${accountId}?${dates}&interval=${interval}&format=XLSX`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
}
