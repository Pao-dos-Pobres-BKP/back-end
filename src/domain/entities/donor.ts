import { Gender } from "./gender-enum";

export class Donor {
  id: string;
  fullName: string;
  birthDate: Date;
  gender: Gender;
  phone: string;
  cpf: string;
}
