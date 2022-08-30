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

    this.loadState();
    this.loadDepartment();

    this.officeForm = this.formBuilder.group({
      // id: [''],

      // form field state
      stateId: ['0', Validators.required],

      // form field division
      divisionId: ['0', Validators.required],

      // form field district
      districtId: ['0', Validators.required],

      // form field department
      // Is "office name" or "department name"
      organizationId: ['0', Validators.required],


      // division -> to name
      // form field office name
      name: ['', Validators.required],

      // form field lanf line number
      landlineNo: [''],

      // form field emailId
      emailId: ['', Validators.email],

      // form field address
      address: ['', Validators.required],

      // form field person name
      contactPersonName: [''],

      // form field mobileNo.
      mobileNo: [''],

      // createdBy: ['0'],
      // flag: ['']
    })

    // to get the table row selection and assign it to "updateData"
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

  loadDepartment() {
    this.officeService.getDepartment().subscribe(data => {
      this.listDepartment = data['responseData'];
      // console.log(this.listDepartment)
    })
  }

  onStateSelected() {
    console.log("On state selected", this.officeForm.value.stateId);
    this.officeService.getDivision(this.officeForm.value.stateId).subscribe(data => {
      this.listDivisions = data['responseData'];
    })
  }

  onDivisionSelected() {
    if (!!this.officeForm.value.divisionId) {
      console.log("on division selected", this.officeForm.value.divisionId)
      this.officeService.getDistrict(this.officeForm.value.divisionId).subscribe(data => {
        this.listDistricts = data['responseData'];
      })
    }
  }

  saveOffice() {
    if (this.officeForm.valid) {
      const o = { ...this.officeForm.value, id: 0, createdBy: 0, flag: 'i' };
      this.officeService.postOffice(o).subscribe(
        response => {
          alert("data saved..!")
          this.resetOfficeForm();
        },
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
        response => {
          alert("data saved..!")
          this.resetOfficeForm();
        },
        error => console.error("Error: ", error)
      )
    }
  }

  // to reset form fields and Errors while populating data to form from table
  resetOfficeForm() {
    this.officeForm.reset()
    this.officeForm.setValue({

      stateId: 0,
      divisionId: 0,
      districtId: 0,
      organizationId: 0, //department

      name: '', //office name
      landlineNo: '',
      emailId: '',
      address: '',

      contactPersonName: '',
      mobileNo: ''
    })

    // console.log("update office component - reset office form: I run");
  }

  populateOfficeForm(data: Office) {

    this.listDistricts = [{ id: data.districtId, district: data.district }]
    this.listDivisions = [{ id: data.divisionId, division: data.division }]

    this.resetOfficeForm();
    this.officeForm.patchValue({

      stateId: data.stateId,
      divisionId: data.divisionId,
      districtId: data.districtId,
      organizationId: data.organizationId,

      name: data.name,
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
