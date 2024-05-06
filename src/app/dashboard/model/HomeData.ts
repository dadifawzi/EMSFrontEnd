import {Mission} from "./Mission";
import {User} from "./User";
import {Client} from "./Client";
import {Expense} from "./Expense";
import {ExpenseType} from "./ExpenseType";
import {Key} from "@ng-bootstrap/ng-bootstrap/util/key";

export  class  HomeData {
mission:Mission;
user:User ;
client:Client;
expense:Expense;
expenseType : ExpenseType;
  [key: string]: any;


  constructor(m: Mission,  c: Client, u: User, e: Expense, et: ExpenseType ) {
    this.mission = m;
    this.user = u;
    this.client = c;
    this.expense = e;
    this.expenseType = et;
  }
}
