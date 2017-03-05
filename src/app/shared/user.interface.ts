import {PatientBase} from "./patien.interface";
export class UserBase {
  doctorId: number;
  email: string;
  password: string;
  patients:PatientBase[];
}

export class UserInput {
  email: string;
  password: string;
}
