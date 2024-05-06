export interface ExpenseData {
    _id: string;
    missionTitle: string;
    user: User;
    date: Date;
    comment: string;
    expenses: ExpenseDetail[];
  }


  export interface ExpenseDetail {
    _id: string;
    customer: Customer;
    expenseType: ExpenseType;
    amount: number;
    comment: string;
  }

  export interface User {
  _id: string;
  fullname: string;
  email: string;
  password:string; 
  tel:string;
  image:string; 
  tag:string;
  date:string;
  role:string;

  
}


export interface ExpenseType {
  _id: string;
  name: string;
}
export interface Customer {
  _id: string;
  fullname: string;
  email:string;
  adress:string;
  tel:string; 
  image:string; 
  distance:string;
  date:string;

}



  