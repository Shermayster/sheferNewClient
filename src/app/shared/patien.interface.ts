
export class PatientBase {
  patientID:number;
  doctorId:number;
  password:number;
  contact:ParentContact;
  program:ActivitiesProgram[];
  constructor(details: {
    patientID?: number,
    doctorId?: number,
    password?:number,
    contact?:ParentContact,
    program?:ActivitiesProgram[],
  } = {}) {
    this.patientID = details.patientID || null;
    this.doctorId = details.doctorId || null;
    this.password = details.password || null;
    this.contact = details.contact || new ParentContact();
    this.program = details.program || [];
  }
}

export class ParentContact {
  patientId:number;
  parentName:string;
  lastName:string;
  childName: string;
  startDate: Date;
  tel: string;
  tel2?: string;
  email: string;
  constructor(address: {
    patientId?:number,
    parentName?:string,
    lastName?:string,
    childName?: string,
    startDate?: Date,
    tel?: string,
    tel2?: string,
    email?: string
  } = {}) {
    this.patientId = address.patientId || null;
    this.parentName = address.parentName || '';
    this.lastName = address.lastName || '';
    this.childName = address.childName || '';
    this.tel = address.tel || '';
    this.tel2 = address.tel2 || '';
    this.email = address.email || '';
  }
}

export class ActivitiesProgram {
  programID:number;
  patientId:number;
  status:boolean;
  startDay:string;
  duration:number;
  currentWeek:number;
  patientActivityList:patientActivity[];
  constructor(program: {
    programID?:number,
    patientId?:number,
    status?:boolean,
    startDay?:string,
    duration?:number,
    currentWeek?:number
  } = {}) {
    this.programID = program.programID || null;
    this.patientId = program.patientId || null;
    this.status = program.status || null;
    this.startDay = program.startDay || null;
    this.duration = program.duration || null;
    this.currentWeek = program.currentWeek || null;
  }
}
export class patientActivity {
  patientActivityId:number;
  activityRestponce:string;
  activityFeedback:string;
  activityStatus:string;
  programId:number;
  activityId:number;
  activityGroupAge:number;
  activityName:string;
  activityType:string;
  rationaleCategory: string;
  activityNameParent: string;
  description: string;
  constructor(activity: {
    patientActivityId?:number,
    activityRestponce?:string,
    activityFeedback?:string,
    activityStatus?:string,
    programId?:number,
    activityId?:number,
    activityGroupAge?:number,
    activityName?:string,
    activityType?:string,
    rationaleCategory?: string,
    activityNameParent?: string,
    description?: string
  } = {}) {
    this.patientActivityId = activity.patientActivityId || null;
    this.activityRestponce = activity.activityRestponce || "";
    this.activityFeedback = activity.activityFeedback || "";
    this.activityStatus = activity.activityStatus || "";
    this.programId = activity.programId || null;
    this.activityId = activity.activityId || null;
    this.activityGroupAge = activity.activityGroupAge || null;
    this.activityName = activity.activityName || null;
    this.activityType = activity.activityType || null;
    this.rationaleCategory = activity.rationaleCategory || '';
    this.activityNameParent = activity.activityNameParent || '';
    this.description = activity.description || '';

  }
}

export class ActivitiesResponse {
  programId:number;
  activityName: string;
  activityResponse: string;
  week: number;
}
