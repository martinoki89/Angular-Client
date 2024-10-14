import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { reportsMock } from '../pages/reports/reports-mock';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReportDataByDate(date: string): Observable<any> {
    //TODO: retornar desde el servicio
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const url = `https://seashell-app-r8dit.ondigitalocean.app/api/accounts/11170?date=${date}`;
    // return this.http.get<any>(this.apiUrl);
    return of(reportsMock);
  }

  getReportDataByRange(startDate: string, endDate: string): Observable<any> {
    const token = `x_OaoH8XuDX8jQUV6unRqm-n9D8MdzFlEJl1ImuYQzl_igz2H_UBChqp3yrtaPU254UQY54p-8m7wepwKaiBVaeX_rQORXUMhuoUrz67kRSdR2BHUUqpFeScPIUrWtWjjxFt1wjm1XwgvZqGFTTanFmrDIDk4Zcz33SpJaaW6vG-qYYS_1eUoNC0-LmUCSNJw2GMso-7_N2DzbNrbWfEj5qDmwevyLzF4b7cQ4Fb4VEb4Dt0MKLFkE1bJLjBkUFTmNNmWP3AkpBzjPfM9JIjdu75oQ6vUljT4bFfjSwYE-5XvimcYhkDNEaF-nv4SFkkhP0wLWBD8yGYnLXQnqeQ7aqXenCK7auxwe4TYNdQlRcsFvvqQEbJbCQhGF_-JuIT68R5hga2bviLdUnEZJbUOLu8qr25RSIkuCRi60yoYobihvsq7nehaYNUyeLfTnN-sz1mQ5MHqsO1WZ1u4ToShytrhmQQJUzKP7i8T3vzQ5M`;
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth() + 1;
    const startDay = new Date(startDate).getDate();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth() + 1;
    const endDay = new Date(endDate).getDate();
    // const url = `https://seashell-app-r8dit.ondigitalocean.app/api/accounts/11170?startDate=${startYear}-${startMonth}-${startDay}&endDate=${endYear}-${endMonth}-${endDay}`;
    const url = `/api/api/accounts/11170?startDate=2024-06-01&endDate=2024-06-10`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return of(reportsMock);
  }
}
