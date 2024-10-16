import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { reportsMock } from '../pages/reports/reports-mock';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccount(name: string): Observable<any> {
    const token = `GrSVBXdaHw30HIO6CdnUU5bAsy2Ngo3AJfafS0qckukGYSVrbN75SMwIWxI7mqQekW9mFP08ocOiTnVhlivWBD9LC9DqoROYUWz2iiktMNBS24jBWBPYld0YlpnLKi9K_Hrkga2kiogrk7imXHwfrpnx8H4_dc0kNlZXlDjS2ElKwRgSdxrv8PcxdWYE6NXXNIn9v93boz0WxMqfy6TXDPWyvTqsiGvIo1xhthWya-rzuTRhua0YMKB385cmSqRTVyV5L5nh8kFdG9g7HpkXKgXswZF8dpl3UXiK0sA-6pBnz1jehSQNg31G_5cFjG47pV0oDBfjvGdPMCteHNM_PmSJeLZXPUyvt458A7t51pdh5fUI4Jl6u32PyJne2Ia6ybF3qe_Vsku7Av_rO-aLXbCLhTtGyMjZzd6ejHTejC8wb_CuJA0VD3zo9mu3L2j8qZAroVHbdGEqPDLMjUYaiGvR-fKfad3OKZ5FGAP-OOA`;
    const url = `/api/api/accounts?filter=${name}`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return of(reportsMock);
  }
}
