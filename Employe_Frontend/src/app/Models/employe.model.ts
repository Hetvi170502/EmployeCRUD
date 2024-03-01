import { designation } from "./designation.model";
import { employeHobby } from "./employeHobby.model";
import { Hobby } from "./hobby.model";


export interface  employe
{
  id : number;
  employeName : string;
  gender : string;
  designationId : number;
  email : string;
  phoneNumber : string;
  employeHobbies : employeHobby[];
  designation : {
    id : number;
    designationName : string;
  }

}



