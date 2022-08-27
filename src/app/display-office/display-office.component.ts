import { Component, OnInit } from '@angular/core';
import { Office } from '../model/office';
import { GetOfficeService } from '../services/get-office.service';

@Component({
  selector: 'app-display-office',
  templateUrl: './display-office.component.html',
  styleUrls: ['./display-office.component.scss']
})
export class DisplayOfficeComponent implements OnInit {

  listOffice!: Office[];

  constructor(private officeService: GetOfficeService) { }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.officeService.displayOffice().subscribe(data => {
      this.listOffice = data['responseData']['data'];
      // console.log(data['responseData']);
      // console.log(data['responseData']['data']);
    })
  }


  displayedColumns: string[] = ['rowNumber', 'department', 'office', 'person', 'mobileNo', 'district'];
  dataSource = this.listOffice;

}
