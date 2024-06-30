import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interface definitions based on the given JSON structure
interface User {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  tel: string;
  image: string;
  tag: string;
  date: string;
  role: string;
  deleted: boolean;
  __v: number;
}

interface Customer {
  _id: string;
  fullname: string;
  email: string;
  adress: string;
  tel: string;
  image: string;
  distance: string;
  date: string;
  deleted: boolean;
  __v: number;
}

interface ExpenseType {
  _id: string;
  name: string;
  __v: number;
}

interface Expense {
  customer: Customer;
  expenseType: ExpenseType;
  amount: number;
  comment: string;
  _id: string;
}

interface Mission {
  _id: string;
  missionTitle: string;
  user: User;
  date: string;
  comment: string;
  validated: boolean;
  locked: boolean;
  deleted: boolean;
  expenses: Expense[];
  __v: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseReport {

  constructor() { }

  generateExpenseReportPDF(mission: Mission) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Expense Report', 10, 10);

    // User information
    doc.setFontSize(12);
    doc.text(`Person: ${mission.user.fullname}`, 10, 20);

    // Table of expenses
    const tableColumn = ["Customer", "Date", "Expense Type", "Amount"];
    const tableRows: any[] = [];

    mission.expenses.forEach(expense => {
      const expenseData = [
        expense.customer.fullname,
        new Date(expense.customer.date).toLocaleDateString(),
        expense.expenseType.name,
        expense.amount.toString()
      ];
      tableRows.push(expenseData);
    });

    // Generate table using autoTable plugin
    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows
    });

    // Save the PDF
    doc.save('expense_report.pdf');
  }
}
