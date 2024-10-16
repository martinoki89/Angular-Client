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
    const token = `zf_aI-revgodriwIrQPn9Kw0RskiRfsATXwpZBkwMWXpevIaSc5xr-qrmWEn_h64UwjwD4hIW9XZsKuFzXiyeF7w2YeYrL_LcFSwHm-bGwUthvGqk-pa9jwnaCeuZGKOOwf7tI4fVFe5ON7sQP3O2TEzkZUjfI3zy1HHYBfjAAKog210GaC30sAD8gkaNH22J_JT0inizb_nyR9WXyrxSMt-0iQuwxLaQZqIRbwC43xjdCtxpHZyAOpV1mAhJKli-45DnWSY39drbUYRYZL8cG8MFsxO_4VUrXw6wlqE6xkNCiym_im8sxE_ZGLD6DfU3bfBZO1vFtl5exCjPZeQUEiCc8m-MdnskCdKJQjakBEG9qwIluVEPFV-H2A4LdAPwgQ6MvUEm38PY0YJhngYAsW4v-7dIiZMaqgtwmy3IYjEx7sLZbzpjggUDiaAO3ESbGtcIvZFem5M428eRG7m4TRQMg7YY4whOLj2L_9ix7I`;
    const url = `/api/api/accounts?filter=${name}`;
    return this.http.get<any>(url, {});
  }
}
