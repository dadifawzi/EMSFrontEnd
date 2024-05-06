import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserserviceService } from '../../core/service/userservice.service';
import { ExpenseserviceService } from '../../core/service/expenseservice.service';
import { ClientserviceService } from '../../core/service/clientservice.service';
import {expenses} from './expenses'
import { FormsModule } from '@angular/forms';
import { Expense } from '../model/Expense';
import { co } from '@fullcalendar/core/internal-common';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-addexpense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css',
})
export class AddexpenseComponent implements OnInit {
  expenseNumber: number[] = [1];
  users: any;
  customers: any;
  types: any;

  customer: any[] = [];
  type: any[] = [];
  ammount: any[] = [];
  comment: any[] = [];

  customerindex: any;
  typeindex: any;

  expense: ExpenseModel = {
    missionTitle: '',
    user: '',
    date: '',
    comment: '',
    expenses: [
      {
        customer: '',
        expenseType: '',
        amount: '',
        comment: '',
      },
    ],
  };
 e:any;

  expenses : any[] =[ {
customer :'' , 
expenseType :'' , 
amount :'' ,
comment :''
  }];

  constructor(private _router : Router , 
    private _expenseService: ExpenseserviceService,
    private _user: UserserviceService,
    private _client: ClientserviceService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadUsers();
    this.loadExpenseTypes();
    this.expenseNumber[0] = 1;
  }

  //get all users
  private loadUsers() {
    this._user.getUsers().subscribe({
      next: (res) => {
        console.log('get all users ' + JSON.stringify(res));

        this.users = res;
      },
    });
  }
  //get all customers
  private loadCustomers() {
    this._client.getClients().subscribe({
      next: (res) => {
        console.log('get all customers ' + JSON.stringify(res));

        this.customers = res;
      },
    });
  }
  //get all types
  private loadExpenseTypes() {
    this._expenseService.getAllTypes().subscribe({
      next: (res) => {
        console.log('get all types ' + JSON.stringify(res));
        this.types = res;
      },
    });
  }

  // to increment number of expenses
  increment(m: any) {
    if (m == 1) {
      this.expenseNumber.push(this.expenseNumber.length + 1);
    } else {
      if (this.expenseNumber.length > 1) {
        this.expenseNumber = this.expenseNumber.slice(
          0,
          this.expenseNumber.length - 1
        );
      }
    }
  }

  addExpense2() {
    console.log('saving new expense ');


try {
      let counter: number = 0;
      for ( let i = 0 ; i < this.expenseNumber.length ; i++) {
       
        console.log('counter :'+counter);
        console.log('first expenses is : '+JSON.stringify(this.expenses))
        

  let m = new expenses( this.customer[counter+1]._id,
  this.type[counter+1]._id,
  this.ammount[counter+1],
  this.comment[counter+1]
)

this.expense.expenses.unshift(m) ; 


counter ++ ; 
}
        try {
 console.log('e before slice  is : '+JSON.stringify(this.expense));

this.expense.expenses = this.expense.expenses.slice(0,-1) ; 
 console.log('e after slice  is : '+JSON.stringify(this.expense));

          this._expenseService.createExpense(this.expense).subscribe({
            next:(res)=>{
              console.log(res);
              this._router.navigate(['/ems/dashboard']);
            },error:(err)=>{
              console.log(err);
              
            }
          });
        } catch (error) {
          console.error(
            'An error occurred while adding mission for expense:'+
            error
          );
          // Handle the error or take appropriate action
        }
      }
      
    catch (err) {
      console.log(err);
    }
  }
}

interface ExpenseModel {
  missionTitle: any;
  user: any;
  date: any;
  comment: any;
  expenses: Expenses[];
}

interface Expenses {
  customer: any;
  expenseType: any;
  amount: any;
  comment: any;
}
