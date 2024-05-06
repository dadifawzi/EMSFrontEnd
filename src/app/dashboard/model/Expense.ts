import {ExpenseType} from "./ExpenseType";

export class Expense {
  id_expense: number;
  expenseType: ExpenseType  ;
  amount: number;
  comment: string;
  invoice_Link: string;
  [key: string]: any;

  constructor(id_expense: number,expensetype : ExpenseType ,  amount: number, comment: string, invoice_Link: string) {
    this.id_expense = id_expense;
    this.expenseType = expensetype  ;
    this.amount = amount;
    this.comment = comment;
    this.invoice_Link = invoice_Link;
  }
}
