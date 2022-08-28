import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Office } from '../model/office';
import { GetOfficeService } from '../services/get-office.service';

@Component({
  selector: 'app-display-office',
  templateUrl: './display-office.component.html',
  styleUrls: ['./display-office.component.scss']
})
export class DisplayOfficeComponent implements OnInit, OnDestroy {

  getTableDataSubscription!: Subscription;

  listOffice!: Office[];

  constructor(private officeService: GetOfficeService) { }


  ngOnInit(): void {
    this.getTableDataSubscription = this.officeService.getTableData().subscribe(data => {
      this.listOffice = data['responseData']['data'];
      // console.log('response data is ', data['responseData']);
      // console.log('response data . data is ', data['responseData']['data']);
    })

  }

  officeRowData(tableEntry: any) {
    this.officeService.sendTableRow(tableEntry)
  }


  displayedColumns: string[] = ['rowNumber', 'department', 'office', 'person', 'mobileNo', 'district', 'update'];

  ngOnDestroy(): void {
    this.getTableDataSubscription.unsubscribe()
  }
}
