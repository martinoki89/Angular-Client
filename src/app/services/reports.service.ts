import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { reportsMock } from '../pages/reports/reports-mock';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReportDataByDate(accountId: string, date: string): Observable<any> {
    const token = `zf_aI-revgodriwIrQPn9Kw0RskiRfsATXwpZBkwMWXpevIaSc5xr-qrmWEn_h64UwjwD4hIW9XZsKuFzXiyeF7w2YeYrL_LcFSwHm-bGwUthvGqk-pa9jwnaCeuZGKOOwf7tI4fVFe5ON7sQP3O2TEzkZUjfI3zy1HHYBfjAAKog210GaC30sAD8gkaNH22J_JT0inizb_nyR9WXyrxSMt-0iQuwxLaQZqIRbwC43xjdCtxpHZyAOpV1mAhJKli-45DnWSY39drbUYRYZL8cG8MFsxO_4VUrXw6wlqE6xkNCiym_im8sxE_ZGLD6DfU3bfBZO1vFtl5exCjPZeQUEiCc8m-MdnskCdKJQjakBEG9qwIluVEPFV-H2A4LdAPwgQ6MvUEm38PY0YJhngYAsW4v-7dIiZMaqgtwmy3IYjEx7sLZbzpjggUDiaAO3ESbGtcIvZFem5M428eRG7m4TRQMg7YY4whOLj2L_9ix7I`;
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
    const token = `zf_aI-revgodriwIrQPn9Kw0RskiRfsATXwpZBkwMWXpevIaSc5xr-qrmWEn_h64UwjwD4hIW9XZsKuFzXiyeF7w2YeYrL_LcFSwHm-bGwUthvGqk-pa9jwnaCeuZGKOOwf7tI4fVFe5ON7sQP3O2TEzkZUjfI3zy1HHYBfjAAKog210GaC30sAD8gkaNH22J_JT0inizb_nyR9WXyrxSMt-0iQuwxLaQZqIRbwC43xjdCtxpHZyAOpV1mAhJKli-45DnWSY39drbUYRYZL8cG8MFsxO_4VUrXw6wlqE6xkNCiym_im8sxE_ZGLD6DfU3bfBZO1vFtl5exCjPZeQUEiCc8m-MdnskCdKJQjakBEG9qwIluVEPFV-H2A4LdAPwgQ6MvUEm38PY0YJhngYAsW4v-7dIiZMaqgtwmy3IYjEx7sLZbzpjggUDiaAO3ESbGtcIvZFem5M428eRG7m4TRQMg7YY4whOLj2L_9ix7I`;
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
  exportXls(params: any, accountId: string) {
    const token = `zf_aI-revgodriwIrQPn9Kw0RskiRfsATXwpZBkwMWXpevIaSc5xr-qrmWEn_h64UwjwD4hIW9XZsKuFzXiyeF7w2YeYrL_LcFSwHm-bGwUthvGqk-pa9jwnaCeuZGKOOwf7tI4fVFe5ON7sQP3O2TEzkZUjfI3zy1HHYBfjAAKog210GaC30sAD8gkaNH22J_JT0inizb_nyR9WXyrxSMt-0iQuwxLaQZqIRbwC43xjdCtxpHZyAOpV1mAhJKli-45DnWSY39drbUYRYZL8cG8MFsxO_4VUrXw6wlqE6xkNCiym_im8sxE_ZGLD6DfU3bfBZO1vFtl5exCjPZeQUEiCc8m-MdnskCdKJQjakBEG9qwIluVEPFV-H2A4LdAPwgQ6MvUEm38PY0YJhngYAsW4v-7dIiZMaqgtwmy3IYjEx7sLZbzpjggUDiaAO3ESbGtcIvZFem5M428eRG7m4TRQMg7YY4whOLj2L_9ix7I`;
    let dates: string;
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
    const url = `/api/api/reports/${accountId}?${dates}&interval=0m:1w:0d&format=XLSX`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
      responseType: 'blob',
    });
  }
}
