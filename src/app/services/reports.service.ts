import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { reportsMock } from '../pages/reports/reports-mock';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReportDataByDate(accountId: string, date: string): Observable<any> {
    const token = `GrSVBXdaHw30HIO6CdnUU5bAsy2Ngo3AJfafS0qckukGYSVrbN75SMwIWxI7mqQekW9mFP08ocOiTnVhlivWBD9LC9DqoROYUWz2iiktMNBS24jBWBPYld0YlpnLKi9K_Hrkga2kiogrk7imXHwfrpnx8H4_dc0kNlZXlDjS2ElKwRgSdxrv8PcxdWYE6NXXNIn9v93boz0WxMqfy6TXDPWyvTqsiGvIo1xhthWya-rzuTRhua0YMKB385cmSqRTVyV5L5nh8kFdG9g7HpkXKgXswZF8dpl3UXiK0sA-6pBnz1jehSQNg31G_5cFjG47pV0oDBfjvGdPMCteHNM_PmSJeLZXPUyvt458A7t51pdh5fUI4Jl6u32PyJne2Ia6ybF3qe_Vsku7Av_rO-aLXbCLhTtGyMjZzd6ejHTejC8wb_CuJA0VD3zo9mu3L2j8qZAroVHbdGEqPDLMjUYaiGvR-fKfad3OKZ5FGAP-OOA`;
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const url = `/api/api/accounts/${accountId}?date=${year}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // return this.http.get<any>(this.apiUrl);
    return of(reportsMock);
  }

  getReportDataByRange(
    accountId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const token = `GrSVBXdaHw30HIO6CdnUU5bAsy2Ngo3AJfafS0qckukGYSVrbN75SMwIWxI7mqQekW9mFP08ocOiTnVhlivWBD9LC9DqoROYUWz2iiktMNBS24jBWBPYld0YlpnLKi9K_Hrkga2kiogrk7imXHwfrpnx8H4_dc0kNlZXlDjS2ElKwRgSdxrv8PcxdWYE6NXXNIn9v93boz0WxMqfy6TXDPWyvTqsiGvIo1xhthWya-rzuTRhua0YMKB385cmSqRTVyV5L5nh8kFdG9g7HpkXKgXswZF8dpl3UXiK0sA-6pBnz1jehSQNg31G_5cFjG47pV0oDBfjvGdPMCteHNM_PmSJeLZXPUyvt458A7t51pdh5fUI4Jl6u32PyJne2Ia6ybF3qe_Vsku7Av_rO-aLXbCLhTtGyMjZzd6ejHTejC8wb_CuJA0VD3zo9mu3L2j8qZAroVHbdGEqPDLMjUYaiGvR-fKfad3OKZ5FGAP-OOA`;
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth() + 1;
    const startDay = new Date(startDate).getDate();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth() + 1;
    const endDay = new Date(endDate).getDate();
    const url = `/api/api/accounts/${accountId}?startDate=${startYear}-${startMonth
      .toString()
      .padStart(2, '0')}-${startDay
      .toString()
      .padStart(2, '0')}&endDate=${endYear}-${endMonth
      .toString()
      .padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`;
    // const url = `/api/api/accounts/11170?startDate=2024-06-01&endDate=2024-06-10`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return of(reportsMock);
  }
}
