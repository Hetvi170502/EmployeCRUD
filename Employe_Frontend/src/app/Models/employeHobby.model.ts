export interface employeHobby
{
  id:number,
  employeId:number,
  hobbyId : number[]
  hobby : {
    id : number,
    hobbyName : string
  }
}
