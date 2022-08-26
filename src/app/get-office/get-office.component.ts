import { Component, OnInit } from '@angular/core';
import { GetOfficeService } from '../services/get-office.service';
import { State } from '../model/state';
import { state } from '@angular/animations';
import { Division } from '../model/division';
import { District } from '../model/district';
import { Department } from '../model/department';

@Component({
  selector: 'app-get-office',
  templateUrl: './get-office.component.html',
  styleUrls: ['./get-office.component.scss']
})
export class GetOfficeComponent implements OnInit {

  constructor(private getOffice: GetOfficeService) { }


  listStates!: State[];
  stateSelected!: string;

  listDivisions!: Division[];
  divisionSelected!: string;

  listDistricts!: District[];
  districtSelected!: string;

  listDepartment!: Department[];
  departmentSelected!: string;

  ngOnInit(): void {
    this.loadState()
  }

  loadState() {
    this, this.getOffice.getState().subscribe(data => {
      this.listStates = data['responseData'];
      // console.log(this.listState);
    })
  }

  onStateSelected(selectedStateId: any) {
    this.getOffice.getDivision(selectedStateId).subscribe(data => {
      this.listDivisions = data['responseData'];
      // console.log(this.listDivisions);
    })
  }

  onDivisionSelected(selectedDivisionId: any) {
    this.getOffice.getDistrict(selectedDivisionId).subscribe(data => {
      this.listDistricts = data['responseData'];
      // console.log(this.listDistricts);
    })
  }

  onDistrictSelected(selectedDistrictId: any) {
    this.getOffice.getDepartment().subscribe(data => {
      this.listDepartment = data['responseData'];
      // console.log(this.listDepartment)
    })
  }

  onDepartmentSelected(selectedDepartmentId: any) { }

  onApply(event: any, selections: any) {
    this.getOffice.selections = selections;
    // console.log(selections);
    this.getOffice.displayOffice();
  }
}
