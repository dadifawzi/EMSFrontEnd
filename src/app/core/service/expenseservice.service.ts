import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../dashboard/model/Expense'; // Assuming you have an Expense model

@Injectable({
  providedIn: 'root'
})
export class ExpenseserviceService {

  private apiUrl = 'http://localhost:3000'; // Update with your API URL

  constructor(private http: HttpClient) { }

  // Fetch all expenses
  getAllExpenses() {
    return this.http.get<Expense[]>(this.apiUrl+'/expense');
  }

// fetch expenses by user 
getAllExpenseByUserId(id:any) {
  return this.http.get<Expense[]>(this.apiUrl+'/expense/user/'+id);
}

  //fetch all types 
  getAllTypes(){
    return this.http.get(this.apiUrl+'/expense/types') ; 
  }

  //add new expense 
  createExpense(expense:any){
    return this.http.post(this.apiUrl+'/expense',expense) ; 
  }

// update expense
  updateExpense(expense:any , id : any ){
    return this.http.put(this.apiUrl+'/expense/'+id , expense) ; 

  }


  //delete expense 
  deleteExpense ( id : any ){
return this.http.delete(this.apiUrl+'/expense/'+id) ; 

  }

  //lockExpense 
  lockExpense(expense:any , id:any){
    return this.http.put(this.apiUrl+'/expense/lock/'+id,expense) ; 
  }

  //validate expense 
  validateExpense(expense:any , id:any ){
    return this.http.put(this.apiUrl+"/expense/validate/"+id,expense); 
    
  }



}
