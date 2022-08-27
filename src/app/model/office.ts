export interface Office {
    rowNumber: number,

    organizationId: number,
    organizationName: string,

    id: number,
    name: string,
    address: string,
    stateId: number,
    divisionId: number,
    talukaId: number,

    contactPersonName: string,
    mobileNo: number,
    landLineNo: number,
    emailId: string,

    isApproved: boolean,

    createdBy: number,
    createdDate: Date,

    isDeleted: boolean,

    state: string,
    division: string,
    district: string,
    taluka: string,

    userId: number,
    userName: string,
    password: string

    // id: number,
    // organizationId:number,
    // name:string,
    // landlineNo:number,
    // emailId:string,
    // stateId:number,
    // divisionId:number,
    // districtId:number,
    // address: string,
    // contactPersonName:string,
    // mobileNo: number,

    // createdBy: number,

}
