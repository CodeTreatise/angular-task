import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Department } from '../model/department';
import { District } from '../model/district';
import { Division } from '../model/division';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class GetOfficeService {
  private userId: number = 1;

  tableData = new Subject();

  // share the table click data with form
  tableRow = new Subject();


  sendTableRow(rowClicked: any) {
    // console.log("row clicked from sendTableRow() officeService", rowClicked);
    this.tableRow.next(rowClicked);
  }

  getTableRow(): Observable<any> {
    return this.tableRow.asObservable();
  }

  constructor(private http: HttpClient) {
  }

  // multi dependancy dropdown http calls | get-office
  getState(): Observable<any> {
    const getStateURL = `https://awsmaster.mahamining.com/master/states/1`;

    return this.http
      .get<State[]>(getStateURL)
      .pipe(
      // tap(data => console.log(`states: ${JSON.stringify(data)}`))
    )
  }

  getDivision(selectedStateId: number): Observable<any> {
    // console.log("Selected state from getDivision() in get-office.service :", selectedStateId);
    const getDivisionURL = `https://awsmaster.mahamining.com/master/divisions/${this.userId}`;
    let paramstate = new HttpParams().set('stateId', selectedStateId)

    return this.http
      .get<Division[]>(getDivisionURL, { params: paramstate })
      .pipe(
      // tap(data => console.log(`Division: ${JSON.stringify(data)}`))
    )
  }

  getDistrict(selectedDivisionId: number): Observable<any> {
    const getDistrictURL = `https://awsmaster.mahamining.com/master/districts/GetDistrictByUserIdDivisionId/${this.userId}/${selectedDivisionId}`;
    // let paramdivision = new HttpParams().set('divisionid', selectedDivisionId)

    return this.http
      .get<District[]>(getDistrictURL)
      .pipe(
      // tap(data => console.log(`District: ${JSON.stringify(data)}`))
    )

  }

  getDepartment(): Observable<any> {
    const getDepartmentURL = `http://awsapi.mahamining.com/mineral-mapping/consumer-project/get-organization?UserId=${this.userId}`;

    return this.http
      .get<Department[]>(getDepartmentURL)
      .pipe(
      // tap(data => console.log(`Department: ${JSON.stringify(data)}`))
    )
  }

  // setTabURL()=> will get all selections from dropdown and create parameters{} and send HTTP get 
  setTableURL(data: any) {
    // console.log(data);
    let params = new HttpParams()
      .set(`stateId`, data.state)
      .set('DivisionId', data.division)
      .set('DistrictId', data.district)
      .set('OrganizationId', data.department)

    this.displayOffice(params).subscribe(data => {
      this.tableData.next(data);
    });
  }

  displayOffice(params: any): Observable<any> {
    const displayOfficeURL = `https://awsapi.mahamining.com/mineral-mapping/department/get-department-details?OrganizationId=0&StateId=1&DivisionId=0&DistrictId=0&NoPage=1&RowsPerPage=10`;

    const officeURL = `https://awsapi.mahamining.com/mineral-mapping/department/get-department-details?&NoPage=1&RowsPerPage=10`;
    return this.http

      // XXXXXX => as passing parameters resived from multi drop down not returning any data..... 
      // ..........another url with pre build paramaeters is called.

      // .get(officeURL, { params: params })
      .get(displayOfficeURL)
      .pipe(
      // tap(data => console.log(`table: ${JSON.stringify(data)}`))
    )
  }

  getTableData(): Observable<any> {
    return this.tableData.asObservable();
  }

  // form insert and update
  postOffice(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `https://awsapi.mahamining.com/mineral-mapping/department/save-department/`;
    return this.http.post<any>(url, data, { headers: headers });
  }

  updateOffice(data: any) {
    // const url = `http://awsapi.mahamining.com/mineral-mapping/department/update-department/${data.organizationId}`
    const url_ = `https://awsapi.mahamining.com/mineral-mapping/department/save-department/`;
    // return { response: "URL not supported" }

    // XXXXXX => commented as URL for put not supported
    return this.http.post<any>(url_, data)
  }

}
