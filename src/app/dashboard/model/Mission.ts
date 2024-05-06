export class Mission {
  id: number;
  mission_title: string;
  comment: string;
  date: string;
  locked: boolean;
  valid: boolean;
  [key: string]: any;
  datetime : any ;

  constructor(
    id: number,
    mission_title: string,
    comment: string,
    date: string,
    locked: boolean,
    valid: boolean
  ) {
    this.id = id;
    this.mission_title = mission_title;
    this.comment = comment;
    this.date = date;
    this.locked = locked;
    this.valid = valid;
  }



}

