export class expenses {
customer : string ; 
expenseType:string ; 
amount : string  ; 
comment : string 
  
    constructor(
      customer : string , expenseType: string, amount:string , comment : string 
    ) {
      this.customer = customer ;
      this.expenseType = expenseType ; 
      this.amount = amount ; 
      this.comment = comment ; 


    }

}