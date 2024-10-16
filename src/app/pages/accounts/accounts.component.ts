import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    RouterModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  accountsFormGroup = new FormGroup({
    name: new FormControl(),
  });
  accounts: any[] = [];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly router: Router
  ) {}

  searchAccount() {
    const { name } = this.accountsFormGroup.controls;
    this.accountsService.getAccount(name.value).subscribe((response: any) => {
      this.accounts = response;
    });
  }

  goToReport(account: any) {
    this.router.navigate([`reports/${account.ID}`]);
  }
}
