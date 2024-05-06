export class ExpenseType {
  id: number;
  name: string;
  [key: string]: any;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
