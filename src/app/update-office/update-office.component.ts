import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GetOfficeService } from '../services/get-office.service';

@Component({
  selector: 'app-update-office',
  templateUrl: './update-office.component.html',
  styleUrls: ['./update-office.component.scss']
})
export class UpdateOfficeComponent implements OnInit {
  officeForm!: FormGroup;
  flags: string[] = ['i', 'u'];
  id: number = Math.ceil(Math.random());

  constructor(private formBuilder: FormBuilder, private getOffice: GetOfficeService) { }

  ngOnInit(): void {

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
  }




  saveForm() {
    if (this.officeForm.valid) {
      let data = this.initializeform();
      data['flag'] = 'i';
      this.getOffice.postOffice(data).subscribe({
        next: (res) => {
          alert("data submited");
        },
        error: () => {
          alert("error in submiting");
        }
      })
      console.log(data);
    }

  }

  updateForm() {
    if (this.officeForm.valid) {
      let data = this.officeForm.value;
      data['flag'] = 'u';
      this.getOffice.updateOffice(this.officeForm.value).subscribe({
        next: (res) => {
          alert("data updated");
        },
        error: () => {
          alert("error in updating");
        }
      })
    }
  }

  initializeform() {
    let data = this.officeForm.value;
    data['createdBy'] = 1;
    data['id'] = this.id;
    return data;
  }

}
