import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Department } from '../model/department';
import { District } from '../model/district';
import { Division } from '../model/division';
import { Office } from '../model/office';
import { State } from '../model/state';
import { GetOfficeService } from '../services/get-office.service';

@Component({
  selector: 'app-update-office',
  templateUrl: './update-office.component.html',
  styleUrls: ['./update-office.component.scss']
})
export class UpdateOfficeComponent implements OnInit, OnDestroy {
  officeForm!: FormGroup;
  flags: string[] = ['i', 'u'];
  id: number = Math.ceil(Math.random());

  entry!: Office;
  getTableRowSubscription!: Subscription;

  listStates!: State[];

  listDivisions!: Division[];

  listDistricts!: District[];

  listDepartment!: Department[];

  updateData!: any;

  constructor(private formBuilder: FormBuilder, private officeService: GetOfficeService) {

  }

  ngOnInit(): void {

    this.loadState()

    this.officeForm = this.formBuilder.group({
      // id: [''],

      organizationId: ['0', Validators.required],
      name: ['', Validators.required],
      landlineNo: [''],
      emailId: ['', Validators.email],
      stateId: ['0', Validators.required],
      divisionId: ['0', Validators.required],
      districtId: ['0', Validators.required],
      address: ['', Validators.required],

      contactPersonName: [''],
      mobileNo: [''],

      // createdBy: ['0'],
      // flag: ['']
    })

    this.getTableRowSubscription = this.officeService.getTableRow().subscribe(data => {
      this.updateData = data;
      this.populateOfficeForm(data);
    })
  }

  loadState() {
    this.officeService.getState().subscribe(data => {
      this.listStates = data['responseData'];
      // console.log(typeof data['responseData']);
    })
  }
  onStateSelected() {
    // console.log('stateId: ', this.officeForm.value.stateId);
    this.officeService.getDivision(this.officeForm.value.stateId).subscribe(data => {
      this.listDivisions = data['responseData'];
      // console.log(this.listDivisions);
    })
  }

  onDivisionSelected() {
    // console.log('divisionId', this.officeForm.value.divisionId);
    this.officeService.getDistrict(this.officeForm.value.divisionId).subscribe(data => {
      this.listDistricts = data['responseData'];
      // console.log(this.listDistricts);
    })
  }

  onDistrictSelected() {
    this.officeService.getDepartment().subscribe(data => {
      this.listDepartment = data['responseData'];
      // console.log(this.listDepartment)
    })
  }
  onDepartmentSelected() { }

  saveOffice() {
    if (this.officeForm.valid) {
      const o = { ...this.officeForm.value, id: 0, createdBy: 0, flag: 'i' };
      this.officeService.postOffice(o).subscribe(
        response => alert("data saved..!"),
        error => console.error("Error: ", error)
      )
    }

  }

  editOffice() {
    if (this.officeForm.valid) {
      let office = { ...this.officeForm.value, id: this.updateData.id, flag: 'u' };

      let response = this.officeService.updateOffice(office);
      // alert(response.response);

      // XXXXXXX => commented as put on provided url is not supported
      this.officeService.updateOffice(office).subscribe(
        response => alert("data updated...!"),
        error => console.error("Error: ", error)
      )
    }
  }

  initializeOffice() {

  }

  populateOfficeForm(data: Office) {
    this.officeForm.patchValue({
      stateId: data.stateId,
      divisionId: data.divisionId,
      districtId: data.divisionId,
      organizationId: data.organizationId,
      landlineNo: data.landLineNo,
      emailId: data.emailId,
      address: data.address,
      contactPersonName: data.contactPersonName,
      mobileNo: data.mobileNo,
    })
    // console.log("from update office", data);
  }

  ngOnDestroy(): void {
    this.getTableRowSubscription.unsubscribe();
  }
}
