import { Component, OnInit } from '@angular/core';
import { ExpenseserviceService } from '../core/service/expenseservice.service';

//up are new updates
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCar,
  faGasPump,
  faHotel,
  faTools,
  faUtensils,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

//data model
import { HomeData } from './model/HomeData';
import { User } from './model/User';
import { ExpenseType } from './model/ExpenseType';

// component preview and update
import { PreviewComponent } from './preview/preview.component';
import { UpdateexpenseComponent } from './updateexpense/updateexpense.component';
import { DashboardserviceService } from '../core/service/dashboardservice.service';
import { an } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  homeData:any;
  currentSortColumn ="date" ; 
currentSortOrder = "asc" ; 
searchTerm ='' ; 
  faCar = faCar;
  faUtensils = faUtensils;
  faHotel = faHotel;
  faGasPump = faGasPump;
  faTools = faTools;
  faPrint = faPrint;
  test=5 ; 

  constructor(
    private _expense: ExpenseserviceService,
    private _router: Router,
    private homeDataService: DashboardserviceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExpenseData();



  }

  //get all expenses
  getExpenseData() {
    this._expense.getAllExpenses().subscribe({
      next: (res) => {
        console.log('expense we get from DB ' + res);
        this.homeData = res ; 
      },
    });
  }

  add() {
    this._router.navigate(['ems/addexpense']);
  }

  getFoodExpenseTotal(): number {
    let amount = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense :any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Restaurant') {
          amount +=e.amount;
        }
      });
    });
    return amount;
  }
  getFuelExpenseTotal(): number {
    // Calculate the sum of expense.amount for ExpenseType "Food"
    let amount = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense:any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Fuel') {
          amount += e.amount;
        }
      });
    });

    return amount;
  }

  getHotelExpenseTotal(): number {
    // Calculate the sum of expense.amount for ExpenseType "Food"
    let amount = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense:any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Hotel') {
          amount  +=e.amount;
        }
      });
    });

    return amount;
  }
  getTaxiExpenseTotal(): number {
    // Calculate the sum of expense.amount for ExpenseType "Food"
    let amount = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense:any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Taxi') {
          amount +=e.amount ;
        }
      });
    });

    return amount;
  }
  getRentExpenseTotal(): number {
    // Calculate the sum of expense.amount for ExpenseType "Food"
    let amoun = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense:any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Rent') {
          amoun += e.amount;
        }
      });
    });

    return amoun;
  }
  getOtherExpenseTotal(): number {
    // Calculate the sum of expense.amount for ExpenseType "Food"
    let amoun = 0;
    // Calculate the sum of expense.amount for ExpenseType "Food"
    this.homeData.forEach((expense:any) => {
      expense.expenses.forEach((e:any) => {
        if (e.expenseType.name == 'Others') {
          amoun += e.amount ;
        }
      });
    });

    return amoun;
  }

  // delete expense 
  deleteExpense(expense:any , id: any) {
      console.log("delete mission: ",id)
  
//check if he is admin or he is the owner of this expense to delete it 
// for role i use the easy way not recommended 

let role = localStorage.getItem("Role"); 
if(!expense.locked){

  if(role =='admin' || id == expense.user._id) {
    console.log("delete mission: ",id) ; 
this._expense.deleteExpense(expense._id).subscribe(
  data => {
    console.log("deleted data : "+JSON.stringify(data));
    this.ngOnInit() ;
  }
)

    }else{console.log("yuo are not admin or your are not the owner ");}
    
  }else{console.log("expense locked can't delete ");
  }
  
}

    // lock expense 
    lockExpense(expense:any , id:any )  {

if(localStorage.getItem('Role')=='admin' || localStorage.getItem('Role')=="BackOffice"){
 if(expense.validated){
this._expense.lockExpense(expense,id).subscribe(
      data => {
        console.log(data);
        
      this.ngOnInit() ; 
    })
  }
}


    

 
    
    }

    //validate Expense 
    validateExpense(expense:any ,id:any)  {
      console.log("validate mission: ",id) ; 
let userid = localStorage.getItem('ID'); 
console.log("saved Id is "+userid);
console.log("expense user id is : "+expense.user._id);
if(userid == expense.user._id){

  this._expense.validateExpense(expense,id).subscribe(
    data => {
      console.log(data);
      
    this.ngOnInit() ; 
  })

}
   
      
    }





  //  sortTable(columnName: string) {

  //     console.log(' sorting table using column : ',columnName)
  //     if(columnName == "amount") {
  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.expense[columnName];
  //         console.log('a.expense["amount"] : ', a.expense["amount"]);
  //         const bValue = b.expense[columnName];
  //         if (aValue < bValue) {
  //           return this.currentSortOrder === 'asc' ? -1 : 1;
  //         } else if (aValue > bValue) {
  //           return this.currentSortOrder === 'asc' ? 1 : -1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     }
  //    else if(columnName == "username") {
  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.user[columnName];
  //         const bValue = b.user[columnName];
  //         if (aValue < bValue) {
  //           return this.currentSortOrder === 'asc' ? -1 : 1;
  //         } else if (aValue > bValue) {
  //           return this.currentSortOrder === 'asc' ? 1 : -1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     }
  //     else if(columnName == "mission_title") {
  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.mission[columnName];
  //         console.log('a.expense["amount"] : ', a.expense["amount"]);
  //         const bValue = b.mission[columnName];
  //         if (aValue < bValue) {
  //           return this.currentSortOrder === 'asc' ? -1 : 1;
  //         } else if (aValue > bValue) {
  //           return this.currentSortOrder === 'asc' ? 1 : -1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     }
  //     else if (columnName == "date") {
  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.mission[columnName];
  //         const bValue = b.mission[columnName];

  //         for (let i = 0; i < aValue.length; i++) {
  //           if (aValue[i] < bValue[i]) {
  //             return this.currentSortOrder === 'asc' ? -1 : 1;
  //           } else if (aValue[i] > bValue[i]) {
  //             return this.currentSortOrder === 'asc' ? 1 : -1;
  //           }
  //         }

  //         return 0;
  //       });

  //     }
  //     else if(columnName == "client_name") {

  //       columnName = "name"
  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.client[columnName];
  //         console.log('a.expense["amount"] : ', a.expense["amount"]);
  //         const bValue = b.client[columnName];
  //         if (aValue < bValue) {
  //           return this.currentSortOrder === 'asc' ? -1 : 1;
  //         } else if (aValue > bValue) {
  //           return this.currentSortOrder === 'asc' ? 1 : -1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     }
  //     else if(columnName == "expenseType") {
  //       columnName = "name" ;

  //       if (this.currentSortColumn === columnName) {
  //         this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
  //       } else {
  //         this.currentSortColumn = columnName;
  //         this.currentSortOrder = 'asc'; // Start with ascending order for the new column
  //       }
  //       this.homeData.sort((a, b) => {
  //         const aValue = a.expenseType[columnName];
  //         console.log('a.expense["amount"] : ', a.expense["amount"]);
  //         const bValue = b.expenseType[columnName];
  //         if (aValue < bValue) {
  //           return this.currentSortOrder === 'asc' ? -1 : 1;
  //         } else if (aValue > bValue) {
  //           return this.currentSortOrder === 'asc' ? 1 : -1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     }
  //   }











  //{
  // onSelectAll(){
  //   this.homeData = this.filtredData;
  // }
  //   onSelectNotValid(){
  //     this.homeData = this.filtredData.filter(data => data.mission.valid == false);

  //   }

  //   onSelectNotLocked(){
  //     this.homeData = this.filtredData.filter(data => data.mission.locked == false);
  //   }

  //   // Inside your component
 

  

  //   //not done yet

  //     printexpense(expense: HomeData) {
  //       const tableRows: (string | number)[][] = [];
  //       let expenses = this.filtredData.filter(data => data.mission.id === expense.mission.id);
  //       expenses.forEach(t =>
  //         tableRows.push([
  //           t.user.username,
  //           t.mission.date.slice(0, 3),
  //           t.expense.amount,
  //           t.expenseType.name,
  //           t.mission.mission_title,
  //           t.client.name
  //         ]));
  //       console.log('expenses : ',expenses)
  // console.log('tableRows',tableRows)      // @ts-ignore
  //     const pdf = new jsPDF();
  //     let y = 20;
  //     pdf.setFontSize(18);
  //     pdf.setTextColor(0, 0, 0);
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     let title = 'rapport de frais'
  //     const textWidth = pdf.getStringUnitWidth(title) * pdf.getFontSize() / pdf.internal.scaleFactor;
  //     const xPos = (pageWidth - textWidth) / 2;
  //     pdf.text(title, xPos, 20);
  //     autoTable(pdf
  //       ,{head:[['User ', 'date' , 'amount','Type', 'Mission','Client']]
  //        // ,body:[[expense.user.username,expense.mission.date.slice(0,3),expense.expense.amount,expense.expenseType.name, expense.mission.mission_title,expense.client.name]]
  //         ,body:tableRows
  //         ,startY: 30
  //       });
  //     // Add signature
  //     pdf.setFontSize(12);
  //     pdf.text('Signature: __________________', 10, pdf.internal.pageSize.getHeight() - 20);

  //     pdf.save('expense-details.pdf');
  //   }

  //   private addUser(user: User) {
  //     const existingUser = this.users.find(u => u.user_id === user.user_id);
  //     if (!existingUser) {
  //       this.users.push(user);
  //     }

  //   }
  //   private addMonth(m: number) {
  //     const  existingmonth = this.month.find(mm => mm === m  )
  //     if (!existingmonth) {
  //       this.month.push(m);
  //     }
  //   }
  //   private addType(m: ExpenseType) {
  //     const  existingType = this.types.find(mm => mm.name == m.name  )
  //     if (!existingType) {
  //       this.types.push(m);
  //     }
  //   }

  //   filterData() {
  //     this.homeData = this.filtredData.filter((data) =>
  //       data.user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       data.mission.mission_title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       data.client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       data.expenseType.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  //   openExpenseDetailsModal(expense: any): void {
  //     if (!this.isModalOpen) {
  //       this.isModalOpen = true;
  //     const  dialogRef  =  this.dialog.open(PreviewComponent, {
  //         data: expense,
  //         enterAnimationDuration: 0,
  //       });
  //       dialogRef.afterClosed().subscribe(() => {
  //         this.isModalOpen = false;
  //       });
  //     }

  //   }
  //}
}
