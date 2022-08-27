import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Department } from '../model/department';
import { District } from '../model/district';
import { Division } from '../model/division';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class GetOfficeService {
  _selections: Object = {
    division: 0,
    state: 0,
    district: 0,
    department: 0


  };
  private userId: number = 1;
  constructor(private http: HttpClient) {

  }

  // multi dependancy dropdown http calls | get-office
  getState(): Observable<any> {
    const getStateURL = `http://awsmaster.mahamining.com/master/states/1`;

    return this.http
      .get<State[]>(getStateURL)
      .pipe(
      // tap(data => console.log(`states: ${JSON.stringify(data)}`))
    )
  }

  getDivision(selectedStateId: number): Observable<any> {
    const getDivisionURL = `http://awsmaster.mahamining.com/master/divisions/${this.userId}`;
    let paramstate = new HttpParams().set('stateId', selectedStateId)

    return this.http
      .get<Division[]>(getDivisionURL, { params: paramstate })
      .pipe(
      // tap(data => console.log(`Division: ${JSON.stringify(data)}`))
    )
  }

  getDistrict(selectedDivisionId: number): Observable<any> {
    const getDistrictURL = `http://awsmaster.mahamining.com/master/districts/GetDistrictByUserIdDivisionId/${this.userId}/${selectedDivisionId}`;
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

  // getting & setting selections of State, Division, District, Department
  public get selections(): Object {
    return this._selections;
  }

  public set selections(data: Object) {
    this._selections = data;
  }

  // load the data inside table | display office
  displayOffice(): Observable<any> {
    // if (this._selections) {
    // let param = this._selections;
    // const params = new HttpParams()

    const displayOfficeURL = `https://awsapi.mahamining.com/mineral-mapping/department/get-department-details?OrganizationId=0&StateId=1&DivisionId=0&DistrictId=0&NoPage=1&RowsPerPage=10`;
    return this.http
      .get(displayOfficeURL)
      .pipe(
      // tap(data => console.log(`table: ${JSON.stringify(data)}`))
    )
    // console.log("from service", this._selections);
    // }

  }

  // getOffice(id: number) Observable<Office>{
  //   return this.http
  //   .get()
  //   ;
  // }

  postOffice(data: any) {
    return this.http.post<any>(`http://awsapi.mahamining.com/mineral-mapping/department/save-department/`, data);
  }

  updateOffice(data: any) {
    return this.http.put<any>(`http://awsapi.mahamining.com/mineral-mapping/department/save-department/`, data)
  }

}
