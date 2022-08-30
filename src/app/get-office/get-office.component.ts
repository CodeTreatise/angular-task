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

  constructor(private officeService: GetOfficeService) { }


  listStates!: State[];
  stateSelected: string = '';

  listDivisions!: Division[];
  divisionSelected: string = '';

  listDistricts!: District[];
  districtSelected: string = '';

  listDepartment!: Department[];
  departmentSelected: string = '';

  ngOnInit(): void {
    this.loadState();
    this.loadDepartment();
  }

  // get and load list of avalable states
  loadState() {
    this.officeService.getState().subscribe(data => {
      this.listStates = data['responseData'];
      // console.log(data['responseData']);
    });
  }

  // get and load list of avalable department
  loadDepartment() {
    this.officeService.getDepartment().subscribe(data => {
      this.listDepartment = data['responseData'];
      // console.log(this.listDepartment)
    });
  }

  onStateSelected(selectedStateId: any) {
    this.officeService.getDivision(selectedStateId).subscribe(data => {
      this.listDivisions = data['responseData'];
      // console.log(this.listDivisions);
    })
  }

  onDivisionSelected(selectedDivisionId: any) {
    this.officeService.getDistrict(selectedDivisionId).subscribe(data => {
      this.listDistricts = data['responseData'];
      // console.log(this.listDistricts);
    })
  }

  // onDistrictSelected(selectedDistrictId: any) { }

  // pass the dropdown selections to service
  onApply(selections: any) {
    this.officeService.setTableURL(selections);
  }


}
