import { Component, model, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { reportsMock } from './reports-mock';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { IReport, IVouchers } from './interfaces';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { ReportsService } from '../../services/reports.service';
import { EDateType } from '../enums';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader.service';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    MatTableModule,
    MatDatepickerModule,
    MatHint,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe,
    MatTabsModule,
    NgxChartsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter(), ReportsService, LoaderService],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any[] = [];
  dates: any[] = [];
  differenceColumns: string[] = [];
  differenceDataSource: any[] = [];
  percentageWeeklyColumns: string[] = [];
  percentageWeeklyDataSource: any[] = [];
  percentageAcumColumns: string[] = [];
  percentageAcumDataSource: any[] = [];

  showRangeDatepicker: boolean = false;
  currencySigns: Record<string, string> = {};
  dateTypeOptions = [
    { name: 'Día', value: EDateType.DAY },
    { name: 'Rango', value: EDateType.RANGE },
  ];
  reportsFormGroup = new FormGroup({
    dateType: new FormControl(EDateType.DAY),
    startDate: new FormControl(),
    endDate: new FormControl(),
    date: new FormControl(),
    daysInterval: new FormControl(1),
    monthsInterval: new FormControl(0),
    weeksInterval: new FormControl(0),
  });
  readonly labelPosition = model<EDateType.DAY | EDateType.RANGE>(
    EDateType.RANGE
  );

  dataChart = [
    {
      name: 'Maldives',
      series: [
        {
          value: 4540,
          name: '2016-09-16',
        },
        {
          value: 4351,
          name: '2016-09-19',
        },
        {
          value: 5988,
          name: '2016-09-18',
        },
        {
          value: 6881,
          name: '2016-09-14',
        },
        {
          value: 3586,
          name: '2016-09-13',
        },
      ],
    },
    {
      name: 'Qatar',
      series: [
        {
          value: 2773,
          name: '2016-09-16',
        },
        {
          value: 4748,
          name: '2016-09-19',
        },
        {
          value: 5303,
          name: '2016-09-18',
        },
        {
          value: 6949,
          name: '2016-09-14',
        },
        {
          value: 2832,
          name: '2016-09-13',
        },
      ],
    },
    {
      name: 'Taiwan',
      series: [
        {
          value: 4611,
          name: '2016-09-16',
        },
        {
          value: 2045,
          name: '2016-09-19',
        },
        {
          value: 5249,
          name: '2016-09-18',
        },
        {
          value: 6613,
          name: '2016-09-14',
        },
        {
          value: 3015,
          name: '2016-09-13',
        },
      ],
    },
    {
      name: 'Palestinian Territory',
      series: [
        {
          value: 6626,
          name: '2016-09-16',
        },
        {
          value: 6928,
          name: '2016-09-19',
        },
        {
          value: 6686,
          name: '2016-09-18',
        },
        {
          value: 6454,
          name: '2016-09-14',
        },
        {
          value: 4746,
          name: '2016-09-13',
        },
      ],
    },
    {
      name: 'Bolivia',
      series: [
        {
          value: 2050,
          name: '2016-09-16',
        },
        {
          value: 5305,
          name: '2016-09-19',
        },
        {
          value: 2292,
          name: '2016-09-18',
        },
        {
          value: 5475,
          name: '2016-09-14',
        },
        {
          value: 3371,
          name: '2016-09-13',
        },
      ],
    },
  ];

  viewPC: [number, number] = [700, 400];
  animationPC = true;
  colorSchemePC = 'vivid';
  labelsPC = true;
  doughnut = true;
  charData: any[] = [];
  accountId!: string;

  percentageFormatterPC(data: any): string {
    return data.value + '%';
  }
  constructor(
    private readonly reportService: ReportsService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute
  ) {
    this.accountId = route.snapshot.params['accountId'];
  }

  ngOnInit(): void {
    this.loaderService.setLoader(true);
  }

  getCurrencySymbol(currency: string): string {
    return this.currencySigns[currency] || '';
  }

  changeDatetype(radioData: MatRadioChange) {
    this.reportsFormGroup.updateValueAndValidity();
    this.showRangeDatepicker = radioData.value === EDateType.RANGE;
  }

  calculateData(reportData: IReport) {
    const report: IReport = reportData;
    const vouchers: IVouchers = report.VouchersByCategory;
    const dates = new Set<string>();
    const columns = new Set<string>();
    const rowsMap: { [key: string]: { [key: string]: number | string } } = {};
    const idValuesMap: { [key: string]: number } = {};

    for (const id in vouchers) {
      if (vouchers.hasOwnProperty(id)) {
        const holdings = vouchers[id][0].Holdings;
        let hasValidDate = false;
        for (const holding of holdings) {
          const date = holding.Date
            ? new Date(holding.Date).toISOString().split('T')[0]
            : '-';
          if (holding.Date) {
            hasValidDate = true;
            dates.add(date);
          }
          if (!rowsMap[date]) {
            rowsMap[date] = {};
          }
          rowsMap[date][id] =
            holding.Value !== null && holding.Value !== undefined
              ? holding.Value
              : '-';
        }
        if (!hasValidDate) {
          idValuesMap[id] = idValuesMap[id] || 0;
        } else {
          columns.add(id);
        }
      }
    }

    this.displayedColumns = ['date', ...Array.from(columns), 'total'];
    const sortedDates = Array.from(dates).sort();
    this.dataSource = sortedDates.map((date) => {
      const row: any = { date };
      let total = 0;
      for (const id of columns) {
        const value = rowsMap[date][id];
        row[id] = value !== undefined ? value : '-';
        if (typeof value === 'number') {
          total += value;
        }
      }
      row['total'] = total > 0 ? total : '-';
      return row;
    });

    for (const id in idValuesMap) {
      if (idValuesMap.hasOwnProperty(id)) {
        const row: any = { date: '-' };
        let total = 0;
        for (const columnId of columns) {
          if (columnId === id) {
            row[columnId] = idValuesMap[id];
            total += idValuesMap[id];
          } else {
            row[columnId] = '-';
          }
        }
        row['total'] = total > 0 ? total : '-';
        if (Object.values(row).filter((item) => item !== '-')?.length) {
          this.dataSource.push(row);
        }
      }
    }
    this.getChartData(this.dataSource);
    this.calculateDifferences();
  }

  calculateDifferences() {
    const columns = this.displayedColumns.slice(1, -1);
    this.differenceColumns = ['date', ...columns, 'total'];
    this.differenceDataSource = this.dataSource.map((row, index, arr) => {
      if (index === 0) {
        const rowWithDifferences: any = { date: row.date };
        this.differenceColumns
          .slice(1, -1)
          .forEach((col) => (rowWithDifferences[col] = '-'));
        return rowWithDifferences;
      }
      const previousRow = arr[index - 1];
      const rowWithDifferences: any = { date: row.date };
      this.differenceColumns.slice(1).forEach((col) => {
        const currentValue = row[col];
        const previousValue = previousRow[col];
        if (
          typeof currentValue === 'number' &&
          typeof previousValue === 'number'
        ) {
          rowWithDifferences[col] = currentValue - previousValue;
        } else {
          rowWithDifferences[col] = '-';
        }
      });
      return rowWithDifferences;
    });
    this.calculateWeeklyPercentages();
  }

  calculateWeeklyPercentages() {
    this.percentageWeeklyColumns = [
      'date',
      'porcentual',
      'ARS',
      'A3500',
      'inflacion',
    ];
    this.percentageWeeklyDataSource = this.dataSource.map((row, index, arr) => {
      if (index === 0) {
        const rowWithPercentages: any = { date: row.date };
        this.percentageWeeklyColumns
          .slice(1)
          .forEach((col) => (rowWithPercentages[col] = 0));
        return rowWithPercentages;
      }
      const previousRow = arr[index - 1];
      const currentValue = row['total'];
      const previousValue = previousRow['total'];
      const porcentual =
        typeof currentValue === 'number' && typeof previousValue === 'number'
          ? currentValue / previousValue - 1
          : 0;
      const activeReturn = this.differenceDataSource.find(
        (data: any) => data.date === row.date
      );
      return {
        date: row.date,
        porcentual,
        ARS: activeReturn.total,
        inflacion: Math.random(),
        A3500: Math.random(),
      };
    });

    this.calculatePercentagesAcum();
  }

  calculatePercentagesAcum() {
    this.percentageAcumColumns = [
      'date',
      'porcentual',
      'ARS',
      'A3500',
      'inflacion',
    ];
    this.percentageAcumDataSource = this.percentageWeeklyDataSource.map(
      (row, index, arr) => {
        if (index === 0) {
          const rowWithPercentages: any = { date: row.date };
          this.percentageAcumColumns
            .slice(1)
            .forEach((col) => (rowWithPercentages[col] = 0));
          return rowWithPercentages;
        }
        const previousRow = arr[index - 1];
        const currentPercentValue = row['porcentual'];
        const previouPercentValue = previousRow['porcentual'];

        const currentARSValue = row['ARS'];
        const previouARSValue = previousRow['ARS'];
        const ARS =
          typeof currentARSValue === 'number' &&
          typeof previouARSValue === 'number'
            ? previouARSValue + currentARSValue
            : 0;
        const porcentual =
          typeof currentPercentValue === 'number' &&
          typeof previouPercentValue === 'number'
            ? (1 + previouPercentValue) * (1 + currentPercentValue) - 1
            : 0;
        const data = this.percentageWeeklyDataSource.filter(
          (data: any) => data.date === row.date
        );
        return {
          date: row.date,
          porcentual,
          ARS,
          inflacion: Math.random(),
          A3500: Math.random(),
        };
      }
    );
  }

  searchData() {
    this.loaderService.setLoader(true);
    const {
      startDate,
      endDate,
      date,
      dateType,
      daysInterval,
      monthsInterval,
      weeksInterval,
    } = this.reportsFormGroup?.controls;
    if (dateType?.value === EDateType.DAY) {
      this.reportService
        .getReportDataByDate(
          this.accountId,
          date.value,
          daysInterval?.value,
          monthsInterval?.value,
          weeksInterval?.value
        )
        .subscribe((reportData: IReport) => {
          this.calculateData(reportData);
          // this.loaderService.setLoader();
        });
    } else {
      this.reportService
        .getReportDataByRange(
          this.accountId,
          startDate.value,
          endDate.value,
          daysInterval?.value,
          monthsInterval?.value,
          weeksInterval?.value
        )
        .subscribe((reportData: IReport) => {
          this.calculateData(reportData);
          // this.loaderService.setLoader();
        });
    }
  }

  checkValidDates() {
    const { startDate, endDate, date, dateType } =
      this.reportsFormGroup?.controls;

    return dateType?.value === EDateType.DAY
      ? !!date?.value
      : !!startDate?.value && !!endDate?.value;
  }

  getChartData(source: any[]) {
    const transformedArray: any[] = [];
    source.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'date') {
          const existing = transformedArray.find((t) => t.name === key);
          const valueEntry = { value: item[key] as number, name: item.date };

          if (existing) {
            existing.series.push(valueEntry);
          } else {
            transformedArray.push({
              name: key,
              series: [valueEntry],
            });
          }
        }
      });
    });
    this.charData = transformedArray;
  }

  exportXls() {
    const {
      startDate,
      endDate,
      date,
      dateType,
      daysInterval,
      monthsInterval,
      weeksInterval,
    } = this.reportsFormGroup?.controls;
    const params =
      dateType?.value === EDateType.DAY
        ? { date: date.value }
        : { startDate: startDate.value, endDate: endDate.value };

    this.reportService
      .exportXls(
        params,
        this.accountId,
        daysInterval?.value,
        monthsInterval?.value,
        weeksInterval?.value
      )
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error al descargar el archivo', error);
        },
      });
  }

  exportPdf() {
    html2canvas
      .default(document.getElementById('printcontent')!, {
        allowTaint: true,
        useCORS: false,
        scale: 3,
      })
      .then(function (canvas: any) {
        const imgData = canvas.toDataURL('image/png');
        console.log(canvas);
        const imgWidth = 283; // Ancho en mm para A4 en formato horizontal
        const pageHeight = 120; // Alto en mm para A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcular altura en mm

        let heightLeft = imgHeight;
        let position = 10;

        const doc = new jsPDF('l', 'mm', 'a4');

        // Añadir la primera imagen
        doc.addImage(imgData, 'PNG', 7, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

        // Agregar más páginas si es necesario
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight; // Ajustar posición
          doc.addPage();
          doc.addImage(imgData, 'PNG', 7, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('demo.pdf');
      });
  }
}
