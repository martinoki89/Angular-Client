import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountsService } from '../../services/accounts.service';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { debounceTime } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatAutocompleteModule,
    RouterModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  accountsFormGroup = new FormGroup({
    account: new FormControl(),
  });
  accounts: any[] = [];
  selectedAccountId?: string;

  ngOnInit(): void {
    this.accountsFormGroup
      .get('account')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value.length >= 3) {
          this.searchAccount(value);
        }
      });
  }

  constructor(
    private readonly accountsService: AccountsService,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

  searchAccount(account: string) {
    this.loaderService.showLoader();
    this.accountsService.getAccount(account).subscribe({
      next: (response: any) => {
        this.accounts = response;
        this.loaderService.hideLoader();
      },
      error: (error: any) => {
        console.error(error);
        this.loaderService.hideLoader();
      },
    });
  }

  displayFn(account: any): string {
    return account?.Name || '';
  }

  goToReport() {
    this.router.navigate([`reports/${this.selectedAccountId}`]);
  }

  selectedData(data: MatOptionSelectionChange) {
    this.selectedAccountId = data.source.value.ID;
  }
}
